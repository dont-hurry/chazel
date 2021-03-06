// The `react-router` library doesn't support hash link (like `home#about`) well
import { HashLink } from "react-router-hash-link";

const scrollWithOffset = (element) => {
  const y = element.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -55; // The height of the `FixedNavigation` component is 55px
  window.scrollTo({ top: y + yOffset, behavior: "smooth" });
};

export default function NavigationItem({ item: { href, target, text } }) {
  if (target === "_blank") {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {text}
      </a>
    );
  }

  // To scroll with offset
  // Reference: https://github.com/rafgraph/react-router-hash-link/issues/25#issuecomment-536688104
  return (
    <HashLink to={href} scroll={(element) => scrollWithOffset(element)}>
      {text}
    </HashLink>
  );
}
