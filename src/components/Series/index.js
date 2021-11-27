import { useState, useEffect } from "react";
import { getChapterById } from "../../services/articles";
import styles from "./index.module.css";
import ChapterButtonGroup from "./ChapterButtonGroup";
import PreviewColumns from "./PreviewColumns";
import PaginationButtons from "./PaginationButtons";

export default function Series({
  series: { title, anchor, showChapterButtons, chapters: chapterIdList },
}) {
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentChapterId, setCurrentChapterId] = useState(
    chapterIdList[chapterIdList.length - 1]
  );
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = currentChapter
    ? Math.ceil(currentChapter.articles.length / 3)
    : 1;

  useEffect(() => {
    getChapterById(currentChapterId).then((returnedData) =>
      setCurrentChapter(returnedData)
    );
  }, [currentChapterId]);

  return (
    <section id={anchor} className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      {showChapterButtons && (
        <ChapterButtonGroup
          chapterIdList={chapterIdList}
          currentChapterId={currentChapterId}
          setCurrentChapterId={setCurrentChapterId}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentChapter && (
        <PreviewColumns chapter={currentChapter} page={currentPage} />
      )}

      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </section>
  );
}
