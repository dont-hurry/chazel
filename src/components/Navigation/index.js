import { useRef, useState, useEffect } from "react";
import NormalNavigation from "./NormalNavigation";
import FixedNavigation from "./FixedNavigation";

let scrollThrottleTimer;

export default function Navigation() {
  const normalNavigationRef = useRef();

  const [isFixedNavigationVisible, setIsFixedNavigationVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const normalNavigationContainer = normalNavigationRef.current;
      if (!normalNavigationContainer) return;

      clearTimeout(scrollThrottleTimer);

      scrollThrottleTimer = setTimeout(() => {
        // The height of the `NormalNavigation` component is 50px
        if (normalNavigationContainer.getBoundingClientRect().top <= -50) {
          setIsFixedNavigationVisible(true);
        } else {
          setIsFixedNavigationVisible(false);
        }
      }, 50);
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
