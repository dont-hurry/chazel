import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [article, setArticle] = useState(null);

  let path, articleId;
  (function extractPathAndArticleId() {
    let matcher =
      /\/articles\/(?<Series>[\w-]+)\/(?<ChapterOrArticleId>[\w-]+)\/(?<ArticleIdOrTitle>[\w-%]+)/;

    let matchResult = window.location.pathname.match(matcher);
    const { Series, ChapterOrArticleId, ArticleIdOrTitle } = matchResult.groups;

    if (ChapterOrArticleId.includes("chapter-")) {
      path = `${Series}/${ChapterOrArticleId}`;
      articleId = ArticleIdOrTitle;
    } else {
      path = Series;
      articleId = ChapterOrArticleId;
    }
  })();

  useEffect(() => {
    // `location.state` may be `undefined`
    if (location.state?.scrollTop) {
      window.scrollTo(0, 0);
    }

    getArticleByPathAndArticleId(path, articleId).then((returnedArticle) =>
      setArticle(returnedArticle)
    );
  }, [location, path, articleId]);

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
          path={path}
          articleId={articleId}
        />
      </div>
    </div>
  );
}
