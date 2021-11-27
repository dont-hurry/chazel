import styles from "./ChapterButtonGroup.module.css";
import Button from "../UI/Button";

export default function ChapterButtonGroup({
  chapters,
  currentChapterIndex,
  setCurrentChapterIndex,
  setCurrentPage,
}) {
  const handleClick = (chapterId) => {
    setCurrentChapterIndex(chapterId);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      {chapters.map((chapter) => (
        <Button
          key={chapter.id}
          active={chapter.id === currentChapterIndex}
          onClick={() => handleClick(chapter.id)}
        >
          {chapter.title}
        </Button>
      ))}
    </div>
  );
}
