import styles from "./index.module.css";
import Column from "./Column";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.gridWrapper}>
        <div className={styles.aboutText}>關於</div>
        <Column
          imageSource="/images/chazel.jpeg"
          name="文章 - 陳建佐 Chazel"
          content="想要寫關於鯨魚的故事"
        />
        <Column imageSource="/images/pohan.jpeg" name="網站 - 陳柏翰" />
      </div>
    </footer>
  );
}
