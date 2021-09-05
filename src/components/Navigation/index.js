import { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";
import navigationItems from "../../data/navigation-items";
import NavigationItem from "./NavigationItem";
import FixedNavigation from "./FixedNavigation";

export default function Navigation() {
  const navigationRef = useRef();
  const [isFixedNavigationVisible, setIsFixedNavigationVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = navigationRef.current;
      if (element.getBoundingClientRect().top < -50) {
        setIsFixedNavigationVisible(true);
      } else {
        setIsFixedNavigationVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={styles.nav} ref={navigationRef}>
        {navigationItems.map((item, index) => (
          <NavigationItem key={index} item={item} />
        ))}
      </nav>

      <FixedNavigation visible={isFixedNavigationVisible} />
    </>
  );
}
