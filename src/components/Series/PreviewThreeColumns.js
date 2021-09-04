import styles from "./PreviewThreeColumns.module.css";

export default function PreviewThreeColumns({ previews }) {
  return (
    <div className={styles.threeColumns}>
      {previews.map(({ coverImage, title, content }) => (
        <div key={title} className={styles.column}>
          <img src={coverImage} alt="" className={styles.coverImage} />
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{content}</div>
        </div>
      ))}
    </div>
  );
}
