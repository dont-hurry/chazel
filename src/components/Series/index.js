import { useState, useEffect } from "react";
import { getPreviewsByChapterAndPage } from "../../services/articles";
import styles from "./index.module.css";
import PreviewThreeColumns from "./PreviewThreeColumns";
import PageButtonSet from "./PageButtonSet";

// TODO: Support multiple chapters
export default function Series({ title, chapters }) {
  const [previews, setPreviews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(chapters[0].articleNum / 3);

  useEffect(() => {
    // For loading skeleton
    setPreviews(null);

    const latestChapter = chapters[chapters.length - 1];
    getPreviewsByChapterAndPage(latestChapter, currentPage).then((data) =>
      setPreviews(data)
    );
  }, [chapters, currentPage]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <PreviewThreeColumns
        previews={previews}
        currentPage={currentPage}
        totalPage={totalPage}
      />

      <PageButtonSet
        currentPage={currentPage}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
