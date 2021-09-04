import styles from "./Button.module.css";

export default function Button({ active, children, onClick }) {
  let className = styles.base;
  if (active) className += ` ${styles.active}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
