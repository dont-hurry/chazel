import styles from "./Select.module.css";

export default function Select({ children, defaultValue, id }) {
  return (
    <select className={styles.base} defaultValue={defaultValue} id={id}>
      {children}
    </select>
  );
}
