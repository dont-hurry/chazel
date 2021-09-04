import { useState, useEffect } from "react";
import { getAllSeries } from "../services/articles";
import styles from "./Main.module.css";
import Series from "./Series";

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
