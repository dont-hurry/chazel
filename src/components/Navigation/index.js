import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import navigationItems from "../../data/navigation-items";
import Item from "./Item";
import FixedNavigation from "./FixedNavigation";

export default function Navigation() {
  const [isFixedNavigationVisible, setIsFixedNavigationVisible] =
    useState(false);

  const navigationRef = useRef();

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
          <Item key={index} item={item} />
        ))}
      </nav>

      <FixedNavigation visible={isFixedNavigationVisible} />
    </>
  );
}
