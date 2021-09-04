import styles from "./PageButtonSet.module.css";
import Button from "../UI/Button";

export default function PageButtonSet({
  currentPage,
  totalPage,
  setCurrentPage,
}) {
  const handleClick = (page) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {new Array(totalPage).fill(null).map((value, index) => (
        <Button
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
}
