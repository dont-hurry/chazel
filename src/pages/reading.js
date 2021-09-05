import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleByPathAndArticleId } from "../services/articles";
import styles from "./reading.module.css";
import Skeleton from "react-loading-skeleton";

export default function Reading({ fontSize, lineHeight, setLineHeight }) {
  const [article, setArticle] = useState(null);

  const { path, articleId } = useParams();

  useEffect(() => {
    getArticleByPathAndArticleId(path, articleId).then((returnedArticle) =>
      setArticle(returnedArticle)
    );
  }, [path, articleId]);

  return (
    <div className={styles.outerContainer}>
      {article && <h2 className={styles.title}>{article.title}</h2>}
      {!article && <Skeleton className={styles.skeletonTitle} />}

      <div className={styles.innerContainer}>
        <div className={styles.contentWrapper} style={{ fontSize, lineHeight }}>
          {article && article.content}
          {!article && <Skeleton count="10" />}
        </div>

        <div className={styles.sidebar}>sidebar</div>
      </div>
    </div>
  );
}
