import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getSeriesTitleBySeriesId,
  getChapterTitleBySeriesIdAndChapterId,
  getArticlesBySeriesIdAndChapterId,
} from "../../services/articles";
import AdminLayout from "../../components/Layout/AdminLayout";
import styles from "./base.module.css";
import Button from "../../components/UI/Button";

export default function ArticleListPage() {
  const { seriesId, chapterId } = useParams();

  let [seriesTitle, setSeriesTitle] = useState("");
  let [chapterTitle, setChapterTitle] = useState("");
  let [articles, setArticles] = useState([]);

  useEffect(() => {
    Promise.all([
      getSeriesTitleBySeriesId(seriesId),
      getChapterTitleBySeriesIdAndChapterId({ seriesId, chapterId }),
      getArticlesBySeriesIdAndChapterId({ seriesId, chapterId }),
    ]).then((returnedDataList) => {
      setSeriesTitle(returnedDataList[0]);
      setChapterTitle(returnedDataList[1]);
      setArticles(returnedDataList[2]);
    });
  }, [seriesId, chapterId]);

  return (
    <AdminLayout title={`文章列表：${chapterTitle}`}>
      <Link
        to={{
          pathname: "/admin/add-article",
          state: { seriesId, chapterId, seriesTitle, chapterTitle },
        }}
      >
        <Button>新增文章</Button>
      </Link>

      <div className={styles.table}>
        <div className={`${styles.tableGridArticleList} ${styles.tableHeader}`}>
          <div>文章標題</div>
          <div>內容預覽</div>
          <div>發表日期</div>
          <div>操作</div>
        </div>

        <div className={styles.tableBody}>
          {articles.map((article) => (
            <Article key={article.title} article={article} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function Article({ article: { title, content, date } }) {
  return (
    <div className={`${styles.tableGridArticleList} ${styles.tableRow}`}>
      <div>{title}</div>
      <div className={styles.preview}>
        {content.replace(/　/g, "").substring(0, 80)}
      </div>
      <div>{date}</div>
      <div className={styles.buttonGroup}>
        <div>編輯</div>
        <div>刪除</div>
      </div>
    </div>
  );
}
