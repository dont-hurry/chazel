import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getSeriesTitleBySeriesId,
  getChaptersBySeriesId,
} from "../../services/articles";
import AdminLayout from "../../components/Layout/AdminLayout";
import styles from "./base.module.css";
import { Link } from "react-router-dom";

export default function ChapterListPage() {
  const { seriesId } = useParams();

  let [seriesTitle, setSeriesTitle] = useState("");
  let [chapters, setChapters] = useState([]);

  useEffect(() => {
    Promise.all([
      getSeriesTitleBySeriesId(seriesId),
      getChaptersBySeriesId(seriesId),
    ]).then((returnedDataList) => {
      setSeriesTitle(returnedDataList[0]);
      setChapters(returnedDataList[1]);
    });
  }, [seriesId]);

  return (
    <AdminLayout title={`章節列表：${seriesTitle}`}>
      <div className={styles.table}>
        <div className={`${styles.tableGridChapterList} ${styles.tableHeader}`}>
          <div>章節標題</div>
          <div>文章數量</div>
        </div>

        <div className={styles.tableBody}>
          {chapters.map((chapter, index) => (
            <Chapter
              key={chapter.title}
              chapter={chapter}
              seriesId={seriesId}
              articleId={index}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function Chapter({ chapter: { title, articleNum }, seriesId, articleId }) {
  return (
    <Link to={`/admin/article-list/${seriesId}/${articleId}`}>
      <div className={`${styles.tableGridChapterList} ${styles.tableRow}`}>
        <div>{title}</div>
        <div>{articleNum}</div>
      </div>
    </Link>
  );
}
