import styles from "./PaginationButtons.module.css";
import Button from "../UI/Button";

export default function PaginationButtons({
  currentPage,
  setCurrentPage,
  totalPage,
}) {
  const handleClick = (targetPage) => {
    if (targetPage !== currentPage) setCurrentPage(targetPage);
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
