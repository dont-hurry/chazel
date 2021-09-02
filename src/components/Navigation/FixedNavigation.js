import styles from "./FixedNavigation.module.css";
import navigationItems from "../../data/navigation-items";
import Item from "./Item";

export default function FixedNavigation({ visible }) {
  const navClassName = `${styles.container} ${
    visible ? styles.visible : styles.invisible
  }`;

  return (
    <nav className={navClassName}>
      <div className={styles.left}>
        <span>Chazel</span>
      </div>

      <div className={styles.right}>
        {navigationItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </nav>
  );
}
