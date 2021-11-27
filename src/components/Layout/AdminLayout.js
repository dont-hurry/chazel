import styles from "./AdminLayout.module.css";

export default function AdminLayout({ title, children }) {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
