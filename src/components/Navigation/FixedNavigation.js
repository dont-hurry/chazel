import styles from "./FixedNavigation.module.css";
import { Link } from "react-router-dom";
import navigationItems from "../../data/navigation-items";
import NavigationItem from "./NavigationItem";

export default function FixedNavigation({ visible }) {
  const navClassName = `${styles.container} ${
    visible ? styles.visible : styles.invisible
  }`;

  return (
    <nav className={navClassName}>
      <Link to="/" className={styles.heading}>
        Chazel
      </Link>

      <div className={styles.itemsContainer}>
        {navigationItems.map((item) => (
          <NavigationItem key={item.id} item={item} />
        ))}
      </div>
    </nav>
  );
}
