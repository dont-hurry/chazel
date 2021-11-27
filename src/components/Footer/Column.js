import styles from "./Column.module.css";

export default function Column({ avatar, name, content }) {
  return (
    <div className={styles.container}>
      <img src={avatar} alt="" className={styles.avatar} />

      <div className={styles.textContainer}>
        <div className={styles.textName}>{name}</div>
        {content && <div className={styles.textContent}>{content}</div>}
      </div>
    </div>
  );
}
