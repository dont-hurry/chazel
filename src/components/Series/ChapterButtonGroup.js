import styles from "./ChapterButtonGroup.module.css";
import { useState, useEffect } from "react";
import { getChapterById } from "../../services/articles";
import Button from "../UI/Button";

export default function ChapterButtonGroup({
  chapterIdList,
  currentChapterId,
  setCurrentChapterId,
  setCurrentPage,
}) {
  return (
    <div className={styles.container}>
      {chapterIdList.map((chapterId) => (
        <ChapterButton
          key={chapterId}
          active={chapterId === currentChapterId}
          chapterId={chapterId}
          setCurrentChapterId={setCurrentChapterId}
          setCurrentPage={setCurrentPage}
        />
      ))}
    </div>
  );
}

function ChapterButton({
  active,
  chapterId,
  setCurrentChapterId,
  setCurrentPage,
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    getChapterById(chapterId).then((returnedData) =>
      setTitle(returnedData.title)
    );
  }, [chapterId]);

  const handleClick = (chapterId) => {
    setCurrentChapterId(chapterId);
    setCurrentPage(1);
  };

  return (
    <Button active={active} onClick={() => handleClick(chapterId)}>
      {title}
    </Button>
  );
}
