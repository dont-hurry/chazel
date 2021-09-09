import styles from "./ChapterButtonGroup.module.css";
import Button from "../UI/Button";

export default function ChapterButtonGroup({
  chapters,
  currentChapterIndex,
  setCurrentChapterIndex,
}) {
  if (chapters.length === 1) return null;

  return (
    <div className={styles.container}>
      {chapters.map((chapter) => (
        <Button
          key={chapter.id}
          active={chapter.id === currentChapterIndex}
          onClick={() => setCurrentChapterIndex(chapter.id)}
        >
          {chapter.title}
        </Button>
      ))}
    </div>
  );
}
