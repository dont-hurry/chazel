import { useState, useEffect } from "react";
import { getSiblingArticles } from "../../services/articles";
import styles from "./index.module.css";
import ButtonGroup from "./ButtonGroup";
import fontSizeOptions from "../../data/font-size-options";
import lineHeightOptions from "../../data/line-height-options";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

// TODO: Extract getting sibling articles into another component
export default function ReadingSidebar({
  fixed,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  path,
  articleId,
}) {
  const [previousArticleInfo, setPreviousArticleInfo] = useState(null);
  const [nextArticleInfo, setNextArticleInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const { previousArticle, nextArticle } = await getSiblingArticles(
        path,
        articleId
      );
      setPreviousArticleInfo(
        previousArticle && {
          title: previousArticle.title,
          linkTo: previousArticle.linkTo,
        }
      );
      setNextArticleInfo(
        nextArticle && {
          title: nextArticle.title,
          linkTo: nextArticle.linkTo,
        }
      );
    })();
  }, [path, articleId]);

  const fixedStyle = {
    position: "fixed",
    top: 55,
    left: (window.innerWidth - 980) / 2 + 800,
  };

  return (
    <div className={styles.container} style={fixed ? fixedStyle : {}}>
      <ButtonGroup
        title="字體大小"
        options={fontSizeOptions.options}
        currentOption={fontSize}
        setOption={setFontSize}
      />
      <ButtonGroup
        title="行距"
        options={lineHeightOptions.options}
        currentOption={lineHeight}
        setOption={setLineHeight}
      />

      <div className={styles.siblingArticlesButtonGroup}>
        {previousArticleInfo && (
          <Link to={previousArticleInfo.linkTo}>
            <Button>
              <div className={styles.textSmall}>上一篇</div>
              <div className={styles.siblingArticleTitle}>
                {previousArticleInfo.title}
              </div>
            </Button>
          </Link>
        )}
        {nextArticleInfo && (
          <Link to={nextArticleInfo.linkTo}>
            <Button>
              <div className={styles.textSmall}>下一篇</div>
              <div className={styles.siblingArticleTitle}>
                {nextArticleInfo.title}
              </div>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
