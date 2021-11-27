import { forwardRef } from "react";
import styles from "./NormalNavigation.module.css";
import navigationItems from "../../constants/navigation-items";
import NavigationItem from "./NavigationItem";

export default forwardRef(function NormalNavigation(props, ref) {
  return (
    <nav className={styles.container} ref={ref}>
      {navigationItems.map((item) => (
        <NavigationItem key={item.id} item={item} />
      ))}
    </nav>
  );
});
