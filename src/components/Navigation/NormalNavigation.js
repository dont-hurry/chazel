import { forwardRef } from "react";
import styles from "./NormalNavigation.module.css";
import navigationItems from "../../data/navigation-items";
import NavigationItem from "./NavigationItem";

export default forwardRef(function NormalNavigation(_props, ref) {
  return (
    <nav className={styles.nav} ref={ref}>
      {navigationItems.map((item) => (
        <NavigationItem key={item.id} item={item} />
      ))}
    </nav>
  );
});
