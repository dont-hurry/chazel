import { useState, useEffect } from "react";
import { getPreviewsByChapterAndPage } from "../../services/articles";
import styles from "./index.module.css";

// TODO: Support multiple chapters
export default function Series({ title, chapters }) {
  const [previews, setPreviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(chapters[0].articleNum / 3);

  useEffect(() => {
    const latestChapter = chapters[chapters.length - 1];
    getPreviewsByChapterAndPage(latestChapter, 1).then((data) =>
      setPreviews(data)
    );
  }, [chapters]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div>
        {previews.map(({ coverImage, title, content }) => (
          <div key={title}>
            <img src={coverImage} alt="" />
            <div>{title}</div>
            <div className={styles.content}>{content}</div>
          </div>
        ))}
      </div>
      <div>
        {currentPage}/{totalPage}
      </div>
    </section>
  );
}
