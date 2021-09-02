export default function Item({ item: { href, target, text } }) {
  if (target === "_blank")
    return (
      <a href={href} target={target} rel="noreferrer">
        {text}
      </a>
    );

  return <a href={href}>{text}</a>;
}
