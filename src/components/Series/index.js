import { useState, useEffect } from "react";
import { getPreviewsByChapterAndPage } from "../../services/articles";
import styles from "./index.module.css";
import ChapterButtonGroup from "./ChapterButtonGroup";
import PreviewColumns from "./PreviewColumns";
import PaginationButtons from "./PaginationButtons";

export default function Series({
  series: { title, anchor, showChapterButtons, chapters },
}) {
  const [previews, setPreviews] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    chapters.length - 1
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(chapters[currentChapterIndex].articleNum / 3);

  useEffect(() => {
    // Make `react-loading-skeleton` shown (in the `PreviewColumns` component)
    // when clicking on buttons navigation to another chapter
    setPreviews(null);

    getPreviewsByChapterAndPage({
      chapter: chapters[currentChapterIndex],
      page: currentPage,
    }).then((returnedData) => setPreviews(returnedData));
  }, [chapters, currentChapterIndex, currentPage]);

  return (
    <section id={anchor} className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      {showChapterButtons && (
        <ChapterButtonGroup
          chapters={chapters}
          currentChapterIndex={currentChapterIndex}
          setCurrentChapterIndex={setCurrentChapterIndex}
          setCurrentPage={setCurrentPage}
        />
      )}

      <PreviewColumns previews={previews} />

      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </section>
  );
}
