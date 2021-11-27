import { useState, useEffect } from "react";
import { getAllSeries } from "../services/articles";
import MainLayout from "../components/Layout/MainLayout";
import styles from "./main.module.css";
import Series from "../components/Series";

export default function MainPage() {
  const [allSeries, setAllSeries] = useState([]);

  useEffect(() => {
    getAllSeries().then((responseData) => setAllSeries(responseData));
  }, []);

  return (
    <MainLayout>
      <main className={styles.container}>
        {allSeries.length === 0 && <div className={styles.placeholder}></div>}

        {allSeries.map((series) => (
          <Series key={series.id} series={series} />
        ))}
      </main>
    </MainLayout>
  );
}
