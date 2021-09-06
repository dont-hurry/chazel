import { HashLink } from "react-router-hash-link";

// Reference:
// https://github.com/rafgraph/react-router-hash-link/issues/25#issuecomment-536688104
const scrollWithOffset = (element) => {
  const y = element.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -55;
  window.scrollTo({ top: y + yOffset, behavior: "smooth" });
};

export default function Item({ item: { href, target, text } }) {
  if (target === "_blank") {
    return (
      <a href={href} target={target} rel="noreferrer">
        {text}
      </a>
    );
  }

  return (
    <HashLink to={href} scroll={(element) => scrollWithOffset(element)}>
      {text}
    </HashLink>
  );
}
