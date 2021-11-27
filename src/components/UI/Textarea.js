// Use the same styles as the `Input` component
import styles from "./Input.module.css";

export default function Textarea({ defaultValue, id, placeholder, rows }) {
  return (
    <textarea
      className={styles.base}
      defaultValue={defaultValue}
      id={id}
      placeholder={placeholder}
      rows={rows}
    />
  );
}
