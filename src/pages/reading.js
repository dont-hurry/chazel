import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleByPathAndArticleId } from "../services/articles";
import styles from "./reading.module.css";

// TODO: Move these options into sidebar component
const fontSizeOptions = [14, 18, 22];
const lineHeightOptions = [1.6, 2, 2.4];

export default function Reading() {
  const [article, setArticle] = useState(null);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(2);

  const { path, articleId } = useParams();

  useEffect(() => {
    getArticleByPathAndArticleId(path, articleId).then((data) =>
      setArticle(data)
    );
  }, [path, articleId]);

  if (!article) return null;

  return (
    <div className={styles.outerContainer}>
      <h2 className={styles.title}>{article.title}</h2>

      <div className={styles.innerContainer}>
        <div className={styles.contentWrapper} style={{ fontSize, lineHeight }}>
          {article.content}
        </div>
        <div className={styles.sidebar}>sidebar</div>
      </div>
    </div>
  );
}
