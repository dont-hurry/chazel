import { useParams } from "react-router-dom";

export default function Reading() {
  const { path, articleId } = useParams();

  return (
    <div>
      path: {path}, articleId: {articleId}
    </div>
  );
}
