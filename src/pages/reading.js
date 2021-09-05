import { useState, useEffect } from "react";
import { getArticleByPathAndArticleId } from "../services/articles";
import styles from "./reading.module.css";
import Skeleton from "react-loading-skeleton";
import ReadingSidebar from "../components/ReadingSidebar";

export default function Reading({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
}) {
  const [path, setPath] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // TODO: Use routing with regex instead in `App.js`
    if (!path || !articleId) {
      const [, , first, second, third] = window.location.pathname.split("/");
      if (second.includes("chapter-")) {
        setPath(`${first}/${second}`);
        setArticleId(third);
      } else {
        setPath(first);
        setArticleId(second);
      }
      return;
    }

    window.scrollTo(0, 0);
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

        <ReadingSidebar
          fontSize={fontSize}
          setFontSize={setFontSize}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
        />
      </div>
    </div>
  );
}
