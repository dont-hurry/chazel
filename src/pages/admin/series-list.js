import { useState, useEffect } from "react";
import { getAllSeries } from "../../services/articles";
import AdminLayout from "../../components/Layout/AdminLayout";
import styles from "./base.module.css";
import { Link } from "react-router-dom";

export default function SeriesListPage() {
  let [allSeries, setAllSeries] = useState([]);

  useEffect(() => {
    getAllSeries().then((returnedData) => setAllSeries(returnedData));
  }, []);

  return (
    <AdminLayout title="系列列表">
      <div className={styles.table}>
        <div className={`${styles.tableGridSeriesList} ${styles.tableHeader}`}>
          <div>系列標題</div>
          <div>顯示章節切換按鈕</div>
          <div>章節數量</div>
        </div>

        <div className={styles.tableBody}>
          {allSeries.map((series) => (
            <Series key={series.id} series={series} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function Series({
  series: { id: seriesId, title, showChapterButtons, chapters },
}) {
  return (
    <Link to={`/admin/chapter-list/${seriesId}`}>
      <div className={`${styles.tableGridSeriesList} ${styles.tableRow}`}>
        <div>{title}</div>
        <div>{showChapterButtons ? "是" : "否"}</div>
        <div>{chapters.length}</div>
      </div>
    </Link>
  );
}
