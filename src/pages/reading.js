import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
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
  const readingAreaRef = useRef();
  const [isSidebarFixed, setIsSidebarFixed] = useState();

  useEffect(() => {
    const handleScroll = () => {
      const element = readingAreaRef.current;
      if (element.getBoundingClientRect().top < 55) {
        setIsSidebarFixed(true);
      } else {
        setIsSidebarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const [article, setArticle] = useState(null);

  let path, articleId;

  (function extractPathAndArticleId() {
    const [, , first, second, third] = location.pathname.split("/");
    if (second.includes("chapter-")) {
      path = `${first}/${second}`;
      articleId = third;
    } else {
      path = first;
      articleId = second;
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
        <div
          className={styles.contentWrapper}
          style={{ fontSize, lineHeight }}
          ref={readingAreaRef}
        >
          {article && article.content}
          {!article && <Skeleton count="10" />}
        </div>

        <ReadingSidebar
          fixed={isSidebarFixed}
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
