import styles from "./index.module.css";
import Column from "./Column";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.gridWrapper}>
        <div className={styles.about}>關於</div>
        <Column imageSource="/images/chazel.jpeg" text="文章 - 陳建佐 Chazel" />
        <Column imageSource="/images/pohan.jpeg" text="網站 - 陳柏翰" />
      </div>
    </footer>
  );
}
