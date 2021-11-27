import styles from "./Select.module.css";

export default function Select({ id, children }) {
  return (
    <select className={styles.base} id={id}>
      {children}
    </select>
  );
}
