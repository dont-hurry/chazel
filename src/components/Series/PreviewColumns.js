import styles from "./PreviewColumns.module.css";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function PreviewColumns({ previews }) {
  return (
    <div className={styles.container}>
      {!previews &&
        new Array(3).fill(null).map((value, index) => (
          <div key={index} className={styles.column}>
            <Skeleton className={styles.skeletonCoverImage} />
            <Skeleton className={styles.skeletonTitle} />
            <Skeleton className={styles.skeletonPreview} />
          </div>
        ))}

      {previews &&
        previews.map(({ coverImage, title, preview, url }) => (
          <div key={title} className={styles.column}>
            {/* Scroll the page to the top when navigating to the reading page */}
            <Link to={{ pathname: url, state: { scrollTop: true } }}>
              <img src={coverImage} alt="" className={styles.coverImage} />
            </Link>
            <div className={styles.title}>{title}</div>
            <div className={styles.preview}>{preview}</div>
          </div>
        ))}
    </div>
  );
}
