import { useRef, useState, useEffect } from "react";
import NormalNavigation from "./NormalNavigation";
import FixedNavigation from "./FixedNavigation";

export default function Navigation() {
  const normalNavigationRef = useRef();

  const [isFixedNavigationVisible, setIsFixedNavigationVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const normalNavigationContainer = normalNavigationRef.current;

      // height of `.nav` is 50px
      if (normalNavigationContainer.getBoundingClientRect().top <= -50) {
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
      <NormalNavigation ref={normalNavigationRef} />
      <FixedNavigation visible={isFixedNavigationVisible} />
    </>
  );
}
