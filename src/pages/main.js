import { useState, useEffect } from "react";
import { getAllSeries } from "../services/articles";
import styles from "./main.module.css";
import Series from "../components/Series";

export default function Main() {
  const [allSeries, setAllSeries] = useState([]);

  useEffect(() => {
    getAllSeries().then((allSeries) => setAllSeries(allSeries));
  }, []);

  return (
    <main className={styles.container}>
      {allSeries.map((series) => (
        <Series
          key={series.id}
          title={series.title}
          chapters={series.chapters}
        />
      ))}
    </main>
  );
}
