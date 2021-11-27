import { useState, useEffect } from "react";
import styles from "./PreviewColumns.module.css";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getPreviewsByChapterAndPage } from "../../services/articles";

export default function PreviewColumns({ chapter, page }) {
  const [previews, setPreviews] = useState(null);

  useEffect(() => {
    setPreviews(null);

    getPreviewsByChapterAndPage({ chapter, page }).then((returnedData) =>
      setPreviews(returnedData)
    );
  }, [chapter, page]);

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
        previews.map(({ articleId, coverImage, title, preview }) => {
          const url = `/articles/${articleId}`;

          return (
            <div key={title} className={styles.column}>
              {/* Scroll the page to the top when navigating to the reading page */}
              <Link to={{ pathname: url, state: { scrollTop: true } }}>
                <img
                  src={`images/cover/${coverImage}`}
                  alt=""
                  className={styles.coverImage}
                />
              </Link>
              <div className={styles.title}>{title}</div>
              <div className={styles.preview}>{preview}</div>
            </div>
          );
        })}
    </div>
  );
}
