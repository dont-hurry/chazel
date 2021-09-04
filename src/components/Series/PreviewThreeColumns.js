import styles from "./PreviewThreeColumns.module.css";
import Skeleton from "react-loading-skeleton";

export default function PreviewThreeColumns({ previews }) {
  return (
    <div className={styles.threeColumns}>
      {!previews &&
        new Array(3).fill(null).map((_value, index) => (
          <div key={index} className={styles.column}>
            <Skeleton className={styles.skeletonCoverImage} />
            <Skeleton className={styles.skeletonTitle} />
            <Skeleton className={styles.skeletonContent} />
          </div>
        ))}

      {previews &&
        previews.map(({ coverImage, title, content }) => (
          <div key={title} className={styles.column}>
            <img src={coverImage} alt="" className={styles.coverImage} />
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
          </div>
        ))}
    </div>
  );
}
