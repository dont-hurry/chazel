import styles from "./Input.module.css";

export default function Input({ defaultValue, id, placeholder }) {
  return (
    <input
      className={styles.base}
      defaultValue={defaultValue}
      id={id}
      placeholder={placeholder}
    />
  );
}
