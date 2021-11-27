import { useState, useEffect } from "react";
import { getSiblingArticlesByArticleId } from "../../services/articles";
import styles from "./SiblingArticlesButtonGroup.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

export default function SiblingArticlesButtonGroup({ articleId }) {
  const [previousArticle, setPreviousArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);

  useEffect(() => {
    getSiblingArticlesByArticleId(articleId).then((returnedData) => {
      const {
        previousArticle: returnedPreviousArticle,
        nextArticle: returnedNextArticle,
      } = returnedData;

      setPreviousArticle(returnedPreviousArticle);
      setNextArticle(returnedNextArticle);
    });
  }, [articleId]);

  return (
    <div className={styles.container}>
      {previousArticle && (
        <Link to={`/articles/${previousArticle.articleId}`}>
          <Button>
            <div className={styles.textSmall}>上一篇</div>
            <div className={styles.articleTitle}>{previousArticle.title}</div>
          </Button>
        </Link>
      )}
      {nextArticle && (
        <Link to={`/articles/${nextArticle.articleId}`}>
          <Button>
            <div className={styles.textSmall}>下一篇</div>
            <div className={styles.articleTitle}>{nextArticle.title}</div>
          </Button>
        </Link>
      )}
    </div>
  );
}
