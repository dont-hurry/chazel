import { useState, useEffect } from "react";
import { getPreviewsByChapterAndPage } from "../../services/articles";
import styles from "./index.module.css";
import PreviewThreeColumns from "./PreviewThreeColumns";

// TODO: Support multiple chapters
export default function Series({ title, chapters }) {
  const [previews, setPreviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(chapters[0].articleNum / 3);

  useEffect(() => {
    const latestChapter = chapters[chapters.length - 1];
    getPreviewsByChapterAndPage(latestChapter, 1).then((data) =>
      setPreviews(data)
    );
  }, [chapters]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <PreviewThreeColumns
        previews={previews}
        currentPage={currentPage}
        totalPage={totalPage}
      />

      <div>
        {currentPage}/{totalPage}
      </div>
    </section>
  );
}
