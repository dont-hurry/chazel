import { useState, useEffect } from "react";
import { getSiblingArticlesByPathAndArticleId } from "../../services/articles";
import styles from "./SiblingArticlesButtonGroup.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

export default function SiblingArticlesButtonGroup({ path, articleId }) {
  // ArticleInfo: { title, linkTo }
  const [previousArticleInfo, setPreviousArticleInfo] = useState(null);
  const [nextArticleInfo, setNextArticleInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const { previousArticle, nextArticle } =
        await getSiblingArticlesByPathAndArticleId(path, articleId);

      if (previousArticle) {
        setPreviousArticleInfo({
          title: previousArticle.title,
          linkTo: previousArticle.linkTo,
        });
      }

      if (nextArticle) {
        setNextArticleInfo({
          title: nextArticle.title,
          linkTo: nextArticle.linkTo,
        });
      }
    })();
  }, [path, articleId]);

  return (
    <div className={styles.container}>
      {previousArticleInfo && (
        <Link to={previousArticleInfo.linkTo}>
          <Button>
            <div className={styles.textSmall}>上一篇</div>
            <div className={styles.articleTitle}>
              {previousArticleInfo.title}
            </div>
          </Button>
        </Link>
      )}
      {nextArticleInfo && (
        <Link to={nextArticleInfo.linkTo}>
          <Button>
            <div className={styles.textSmall}>下一篇</div>
            <div className={styles.articleTitle}>{nextArticleInfo.title}</div>
          </Button>
        </Link>
      )}
    </div>
  );
}
