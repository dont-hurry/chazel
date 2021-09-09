import { useState, useEffect } from "react";
import { getPreviewsByChapterAndPage } from "../../services/articles";
import styles from "./index.module.css";
import ChapterButtonGroup from "./ChapterButtonGroup";
import PreviewColumns from "./PreviewColumns";
import PaginationButtons from "./PaginationButtons";

export default function Series({ series: { anchor, title, chapters } }) {
  const [previews, setPreviews] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    chapters.length - 1
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(chapters[currentChapterIndex].articleNum / 3);

  useEffect(() => {
    // For showing react-loading-skeleton in the `PreviewColumns` component
    setPreviews(null);

    getPreviewsByChapterAndPage(
      chapters[currentChapterIndex],
      currentPage
    ).then((returnedPreviews) => setPreviews(returnedPreviews));
  }, [chapters, currentChapterIndex, currentPage]);

  return (
    <section id={anchor} className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <ChapterButtonGroup
        chapters={chapters}
        currentChapterIndex={currentChapterIndex}
        setCurrentChapterIndex={setCurrentChapterIndex}
      />

      <PreviewColumns previews={previews} />

      <PaginationButtons
        currentPage={currentPage}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
