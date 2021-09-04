import allSeries from "../data/series";

export async function getAllSeries() {
  return allSeries;
}

export async function getPreviewsByChapterAndPage(
  chapter,
  page,
  previewNum = 3
) {
  const { articleNum } = chapter;
  let articleIdList = [];

  for (let i = 0; i < previewNum; i++) {
    articleIdList.push(articleNum - i - previewNum * (page - 1));
  }
  articleIdList = articleIdList.filter((articleId) => articleId > 0);

  return Promise.all(
    articleIdList.map((articleId) =>
      getPreviewByChapterAndArticleId(chapter, articleId)
    )
  );
}

async function getPreviewByChapterAndArticleId(chapter, articleId) {
  const { path } = chapter;

  return getArticleByPathAndArticleId(path, articleId).then((articleData) => ({
    ...articleData,
    content: articleData.content.replace(/　/g, "").substring(0, 100) + "⋯⋯",
    linkTo: `/articles/${path}/${articleId}/${articleData.title}/`,
  }));
}

export async function getArticleByPathAndArticleId(path, articleId) {
  const fullArticlePath = `/articles/${path}/${articleId}.json`;

  return fetch(fullArticlePath)
    .then((response) => response.json())
    .then((data) => ({
      ...data,
      coverImage: `/images/cover/${path}/${data.coverImage}`,
    }));
}
