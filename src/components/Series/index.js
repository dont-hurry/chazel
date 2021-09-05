import { useState, useEffect } from "react";
import { getPreviewsByChapterAndPage } from "../../services/articles";
import styles from "./index.module.css";
import PreviewColumns from "./PreviewColumns";
import PaginationButtons from "./PaginationButtons";

// TODO: Support multiple chapters
export default function Series({ title, chapters }) {
  const [previews, setPreviews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(chapters[0].articleNum / 3);

  useEffect(() => {
    // For showing react-loading-skeleton in the `PreviewColumns` component
    setPreviews(null);

    const latestChapter = chapters[chapters.length - 1];
    getPreviewsByChapterAndPage(latestChapter, currentPage).then(
      (returnedPreviews) => setPreviews(returnedPreviews)
    );
  }, [chapters, currentPage]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <PreviewColumns previews={previews} />

      <PaginationButtons
        currentPage={currentPage}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
