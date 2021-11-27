import styles from "./Modal.module.css";
import Button from "./Button";

export default function Modal({
  title,
  content,
  confirmText = "確定",
  confirmHandler,
  cancelText = "取消",
  cancelHandler,
}) {
  const handleClickOnOverlay = (e) => {
    // Due to event bubbling, we have to check if the click actually happened on the overlay
    if (e.target.id === "overlay") {
      cancelHandler();
    }
  };

  return (
    <div id="overlay" className={styles.overlay} onClick={handleClickOnOverlay}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>{title}</div>
        <div className={styles.contentWrapper}>{content}</div>
        <div className={styles.buttonsWrapper}>
          <Button onClick={cancelHandler}>{cancelText}</Button>
          {!confirmHandler && <Button>{confirmText}</Button>}
          {confirmHandler && (
            <Button active onClick={confirmHandler}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
