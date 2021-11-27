import axios from "axios";

const baseUrl = "https://stormy-headland-37546.herokuapp.com/api";

export async function getAllSeries() {
  const request = axios.get(`${baseUrl}/series`);
  return request.then((response) => response.data);
}

export async function getPreviewsByChapterAndPage({ chapter, page }) {
  const PREVIEW_NUM = 3;

  let articleIdList = [];
  const { articleNum } = chapter;

  for (let i = 0; i < PREVIEW_NUM; i++) {
    articleIdList.push(articleNum - PREVIEW_NUM * (page - 1) - i);
  }
  articleIdList = articleIdList.filter((articleId) => articleId > 0);

  return Promise.all(
    articleIdList.map((articleId) =>
      getPreviewByChapterAndArticleId({ chapter, articleId })
    )
  );
}

async function getPreviewByChapterAndArticleId({ chapter, articleId }) {
  const { path } = chapter;

  return getArticleByPathAndArticleId({ path, articleId }).then(
    (articleData) => ({
      ...articleData,
      preview: articleData.content.replace(/　/g, "").substring(0, 100) + "⋯⋯",
    })
  );
}

export async function getArticleByPathAndArticleId({ path, articleId }) {
  const fullPath = `${baseUrl}/articles/${path}/${articleId}`;

  return fetch(fullPath)
    .then((response) => response.json())
    .then((data) => ({
      ...data,
      coverImage: `/images/cover/${path}/${data.coverImage}`,
      url: `/articles/${path}/${articleId}/${data.title}/`,
    }));
}

export async function getSiblingArticlesByPathAndArticleId({
  path,
  articleId,
}) {
  const chapter = await getChapterByPath(path);

  const result = { previousArticle: null, nextArticle: null };

  // Note that `articleId` is parsed from the pathname and it's a string
  const previousArticleId = Number(articleId) - 1;
  if (previousArticleId >= 1) {
    const previousArticle = await getArticleByPathAndArticleId({
      path,
      articleId: previousArticleId,
    });
    result.previousArticle = previousArticle;
  }

  const nextArticleId = Number(articleId) + 1;
  if (nextArticleId <= chapter.articleNum) {
    const nextArticle = await getArticleByPathAndArticleId({
      path,
      articleId: nextArticleId,
    });
    result.nextArticle = nextArticle;
  }

  return result;
}

async function getChapterByPath(path) {
  let allSeries = await getAllSeries();

  for (let series of allSeries) {
    for (let chapter of series.chapters) {
      if (chapter.path === path) return chapter;
    }
  }

  return null;
}

export async function getSeriesTitleBySeriesId(seriesId) {
  let allSeries = await getAllSeries();
  return allSeries[seriesId].title;
}

export async function getChaptersBySeriesId(seriesId) {
  let allSeries = await getAllSeries();
  return allSeries[seriesId].chapters;
}

export async function getChapterTitleBySeriesIdAndChapterId({
  seriesId,
  chapterId,
}) {
  let allSeries = await getAllSeries();
  let chapter = allSeries[seriesId].chapters[chapterId];
  return chapter.title;
}

export async function getArticlesBySeriesIdAndChapterId({
  seriesId,
  chapterId,
}) {
  let allSeries = await getAllSeries();
  let chapter = allSeries[seriesId].chapters[chapterId];
  let path = chapter.path;

  return Promise.all(
    new Array(chapter.articleNum).fill(null).map((value, index) => {
      let articleId = index + 1;
      return getArticleByPathAndArticleId({ path, articleId });
    })
  );
}
