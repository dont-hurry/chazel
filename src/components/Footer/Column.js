import styles from "./Column.module.css";

export default function Column({ imageSource, text }) {
  return (
    <div className={styles.container}>
      <img src={imageSource} alt="" className={styles.avatar} />
      <div className={styles.text}>{text}</div>
    </div>
  );
}
