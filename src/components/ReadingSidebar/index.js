import styles from "./index.module.css";
import OptionsButtonGroup from "./OptionsButtonGroup";
import fontSizeOptions from "../../data/font-size-options";
import lineHeightOptions from "../../data/line-height-options";
import SiblingArticlesButtonGroup from "./SiblingArticlesButtonGroup";

export default function ReadingSidebar({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  path,
  articleId,
}) {
  return (
    <div className={styles.container}>
      <OptionsButtonGroup
        title="字體大小"
        options={fontSizeOptions.options}
        currentOption={fontSize}
        setOption={setFontSize}
      />
      <OptionsButtonGroup
        title="行距"
        options={lineHeightOptions.options}
        currentOption={lineHeight}
        setOption={setLineHeight}
      />

      <SiblingArticlesButtonGroup path={path} articleId={articleId} />
    </div>
  );
}
