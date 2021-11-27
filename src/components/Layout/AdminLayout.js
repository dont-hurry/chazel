import styles from "./AdminLayout.module.css";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

export default function AdminLayout({ title, children, handleArrowLeftClick }) {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <ArrowCircleLeftIcon
            onClick={handleArrowLeftClick || (() => window.history.back())}
          />
          <h2 className={styles.heading}>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
