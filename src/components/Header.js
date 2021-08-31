import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.heading}>Chazel</h1>
      <h2 className={styles.description}>
        「我是塞車之神，你也是塞車之神，這座島上的所有人，都是塞車之神。」
      </h2>
    </header>
  );
}
