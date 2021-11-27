import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleByPathAndArticleId } from "../services/articles";
import MainLayout from "../components/Layout/MainLayout";
import styles from "./reading.module.css";
import Skeleton from "react-loading-skeleton";
import ReadingSidebar from "../components/ReadingSidebar";

// There are two types of pathname:
// 1. /articles/<Series>/<Chapter>/<ArticleId>/<Title>
//    Example: /articles/novel/chapter-3/4/some-title
// 2. /articles/<Series>/<ArticleId>/<Title>
//    Example: /articles/short-story/7/some-title
const matcher =
  /\/articles\/(?<Series>[\w-]+)\/(?<ChapterOrArticleId>[\w-]+)\/(?<ArticleIdOrTitle>[\w-%]+)/;

export default function ReadingPage({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
}) {
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let matchResult = window.location.pathname.match(matcher);
  const { Series, ChapterOrArticleId, ArticleIdOrTitle } = matchResult.groups;

  let path, articleId;

  if (ChapterOrArticleId.includes("chapter-")) {
    path = `${Series}/${ChapterOrArticleId}`;
    articleId = ArticleIdOrTitle;
  } else {
    path = Series;
    articleId = ChapterOrArticleId;
  }

  useEffect(() => {
    if (location.state?.scrollTop) {
      window.scrollTo(0, 0);
    }

    setIsLoading(true);

    getArticleByPathAndArticleId({ path, articleId }).then((returnedData) => {
      setArticle(returnedData);
      setIsLoading(false);
    });
  }, [location, path, articleId]);
  // We add `location` as a dependency here to make the component rerender when
  // the url changes

  return (
    <MainLayout>
      <div className={styles.outerContainer}>
        {isLoading && <Skeleton className={styles.skeletonTitle} />}
        {!isLoading && <h3 className={styles.title}>{article.title}</h3>}

        <div className={styles.innerContainer}>
          <div
            className={styles.contentWrapper}
            style={{ fontSize, lineHeight }}
          >
            {isLoading && <Skeleton count="20" />}
            {!isLoading && article.content}
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
    </MainLayout>
  );
}
