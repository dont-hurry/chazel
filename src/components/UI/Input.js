import styles from "./Input.module.css";

export default function Input({
  defaultValue,
  disabled,
  id,
  placeholder,
  type,
}) {
  return (
    <input
      className={styles.base}
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      placeholder={placeholder}
      type={type || "text"}
    />
  );
}
