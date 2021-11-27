import axios from "axios";

// const baseUrl = "https://stormy-headland-37546.herokuapp.com/api";
const baseUrl = "http://localhost:3001/api";

export async function getAllSeries() {
  const response = await axios.get(`${baseUrl}/series`);
  return response.data;
}

export async function getPreviewsByChapterAndPage({ chapter, page }) {
  const PREVIEW_NUM = 3;

  let { articles } = chapter;

  let articleIndexList = [];
  for (let i = 0; i < PREVIEW_NUM; i++) {
    articleIndexList.push(articles.length - 1 - PREVIEW_NUM * (page - 1) - i);
  }
  articleIndexList = articleIndexList.filter((i) => i >= 0);

  let articleIdList = articleIndexList.map((i) => articles[i]);

  return Promise.all(
    articleIdList.map((articleId) => getArticlePreviewByArticleId(articleId))
  );
}

export async function getChapterById(chapterId) {
  const response = await axios.get(`${baseUrl}/chapters`);
  const chapters = response.data;
  return chapters.find((chapter) => chapter.id === chapterId);
}

async function getArticlePreviewByArticleId(articleId) {
  return getArticleByArticleId(articleId).then((data) => {
    return {
      ...data,
      preview: data.content.replace(/　/g, "").substring(0, 100) + "⋯⋯",
    };
  });
}

export async function getArticleByArticleId(articleId) {
  const url = `${baseUrl}/articles/${articleId}`;

  return fetch(url).then((response) => response.json());
}

export async function getSiblingArticlesByArticleId(articleId) {
  const response = await axios.get(`${baseUrl}/sibling-articles/${articleId}`);
  return response.data;
  /*
  const chapter = await getChapterByPath(path);

  const result = { previousArticle: null, nextArticle: null };

  // Note that `articleId` is parsed from the pathname and it's a string
  const previousArticleId = Number(articleId) - 1;
  if (previousArticleId >= 1) {
    const previousArticle = await getArticleByArticleId(previousArticleId);
    result.previousArticle = previousArticle;
  }

  const nextArticleId = Number(articleId) + 1;
  if (nextArticleId <= chapter.articleNum) {
    const nextArticle = await getArticleByArticleId(nextArticleId);
    result.nextArticle = nextArticle;
  }

  return result;
  */
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
      return getArticleByArticleId(articleId);
    })
  );
}

export async function createSeries(newSeries) {
  const response = await axios.post(`${baseUrl}/series`, newSeries);
  console.log(response.data);
}
