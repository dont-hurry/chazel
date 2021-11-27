import styles from "./index.module.css";
import { ArrowNarrowUpIcon } from "@heroicons/react/solid";

export default function ScrollToTop() {
  const handleClick = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <ArrowNarrowUpIcon />
    </div>
  );
}
