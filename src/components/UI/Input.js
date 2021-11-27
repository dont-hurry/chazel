import styles from "./Input.module.css";

export default function Input({ id, placeholder }) {
  return (
    <input className={styles.base} id={id} placeholder={placeholder} />
  );
}
