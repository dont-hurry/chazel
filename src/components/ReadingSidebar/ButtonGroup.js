import styles from "./ButtonGroup.module.css";
import Button from "../UI/Button";

export default function ButtonSet({
  title,
  options,
  currentOption,
  setOption,
}) {
  const buttons = options.map(({ label, value }) => {
    return (
      <Button
        key={value}
        active={value === currentOption}
        onClick={() => setOption(value)}
      >
        {label}
      </Button>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.buttonsContainer}>{buttons}</div>
    </div>
  );
}
