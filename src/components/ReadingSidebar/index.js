import styles from "./index.module.css";
import ButtonGroup from "./ButtonGroup";
import fontSizeOptions from "../../data/font-size-options";
import lineHeightOptions from "../../data/line-height-options";

export default function ReadingSidebar({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
}) {
  return (
    <div className={styles.container}>
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
    </div>
  );
}
