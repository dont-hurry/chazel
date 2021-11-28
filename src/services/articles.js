import axios from "axios";
import { baseUrl } from "../constants/api";

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
    let content = data.content.replace(/　/g, "");
    let preview =
      content.length > 100 ? content.substring(0, 100) + "⋯⋯" : content;

    return {
      ...data,
      preview,
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
}

export async function getSeriesById(seriesId) {
  let allSeries = await getAllSeries();
  return allSeries.find((s) => s.id === seriesId);
}

export async function getChaptersBySeriesId(seriesId) {
  let { chapters } = await getSeriesById(seriesId);
  let result = await Promise.all(chapters.map((c) => getChapterById(c)));
  return result;
}

export async function getArticlesByChapterId(chapterId) {
  let { articles } = await getChapterById(chapterId);
  let result = await Promise.all(articles.map((a) => getArticleByArticleId(a)));
  return result;
}

export async function createSeries(token, newSeries) {
  const response = await axios.post(`${baseUrl}/series`, newSeries, {
    headers: { Authorization: `bearer ${token}` },
  });
  return response.data;
}

export async function createChapter(token, newChapter, seriesId) {
  const response = await axios.post(
    `${baseUrl}/chapters`,
    {
      newChapter,
      seriesId,
    },
    {
      headers: { Authorization: `bearer ${token}` },
    }
  );
  return response.data;
}

export async function createArticle(token, newArticle, chapterId) {
  const response = await axios.post(
    `${baseUrl}/articles`,
    {
      newArticle,
      chapterId,
    },
    {
      headers: { Authorization: `bearer ${token}` },
    }
  );
  return response.data;
}

export async function updateSeries(token, seriesId, newSeries) {
  await axios.put(`${baseUrl}/series/${seriesId}`, newSeries, {
    headers: { Authorization: `bearer ${token}` },
  });
}

export async function updateChapter(token, chapterId, newChapter) {
  await axios.put(`${baseUrl}/chapters/${chapterId}`, newChapter, {
    headers: { Authorization: `bearer ${token}` },
  });
}

export async function updateArticle(token, articleId, newArticle) {
  await axios.put(`${baseUrl}/articles/${articleId}`, newArticle, {
    headers: { Authorization: `bearer ${token}` },
  });
}

export async function deleteSeries(token, seriesId) {
  await axios.delete(`${baseUrl}/series/${seriesId}`, {
    headers: { Authorization: `bearer ${token}` },
  });
}

// We can't send additional information with DELETE, so we use POST instead
export async function deleteChapter(token, chapterId, seriesId) {
  await axios.post(
    `${baseUrl}/chapters/${chapterId}`,
    {
      seriesId,
    },
    {
      headers: { Authorization: `bearer ${token}` },
    }
  );
}

export async function deleteArticle(token, articleId, chapterId) {
  await axios.post(
    `${baseUrl}/articles/${articleId}`,
    {
      chapterId,
    },
    {
      headers: { Authorization: `bearer ${token}` },
    }
  );
}
