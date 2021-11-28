import { useParams, useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getSeriesById,
  getChapterById,
  getArticlesByChapterId,
  deleteArticle,
} from "../../services/articles";
import AdminLayout from "../../components/Layout/AdminLayout";
import Button from "../../components/UI/Button";
import styles from "./base.module.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import Modal from "../../components/UI/Modal";

export default function ArticleListPage() {
  const { seriesId, chapterId } = useParams();

  let [seriesTitle, setSeriesTitle] = useState("");
  let [chapterTitle, setChapterTitle] = useState("");
  let [articles, setArticles] = useState([]);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  // The target article for deleting
  let [targetArticle, setTargetArticle] = useState(null);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const series = await getSeriesById(seriesId);
      const chapter = await getChapterById(chapterId);
      const returnedArticles = await getArticlesByChapterId(chapterId);

      setSeriesTitle(series.title);
      setChapterTitle(chapter.title);
      setArticles(returnedArticles);
    }

    fetchData();
  }, [seriesId, chapterId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.replace("/");
  };

  return (
    <AdminLayout title={`文章列表：${seriesTitle}，${chapterTitle}`}>
      <div className={styles.headerButtonsContainer}>
        <Link
          to={{
            pathname: "/admin/create-article",
            state: { seriesId, chapterId, seriesTitle, chapterTitle },
          }}
        >
          <Button>新增文章</Button>
        </Link>
        <Button onClick={handleLogout}>登出</Button>
      </div>

      <div className={styles.tableHeader}>
        <div className={`${styles.tableRow} ${styles.tableGridArticleList}`}>
          <div>文章標題</div>
          <div>內容預覽</div>
          <div>發表日期</div>
          <div>操作</div>
        </div>
      </div>

      <div className={styles.tableBody}>
        {articles.map((article) => (
          <ArticleRow
            key={article.title}
            article={article}
            seriesTitle={seriesTitle}
            chapterTitle={chapterTitle}
            setShowDeleteModal={setShowDeleteModal}
            setTargetArticle={setTargetArticle}
          />
        ))}
      </div>

      {showDeleteModal && (
        <DeleteModal
          chapterId={chapterId}
          articles={articles}
          setArticles={setArticles}
          setShowDeleteModal={setShowDeleteModal}
          targetArticle={targetArticle}
        />
      )}
    </AdminLayout>
  );
}

function ArticleRow({
  article,
  seriesTitle,
  chapterTitle,
  setShowDeleteModal,
  setTargetArticle,
}) {
  const { articleId, title, content, date } = article;

  const linkTo = {
    pathname: "/admin/edit-article",
    state: {
      articleId,
      seriesTitle,
      chapterTitle,
      article: { title, date, content },
    },
  };

  const handleClickDelete = (e) => {
    e.preventDefault(); // Prevent navigation
    setShowDeleteModal(true);
    setTargetArticle(article);
  };

  return (
    <Link to={linkTo}>
      <div
        className={`${styles.tableRowWithBackground} ${styles.tableGridArticleList}`}
      >
        <div>{title}</div>
        <div className={styles.preview}>
          {content.replace(/　/g, "").substring(0, 80)}
        </div>
        <div>{date}</div>
        <div className={styles.iconWrapper}>
          <PencilIcon />
          <TrashIcon onClick={handleClickDelete} />
        </div>
      </div>
    </Link>
  );
}

function DeleteModal({
  chapterId,
  articles,
  setArticles,
  setShowDeleteModal,
  targetArticle,
}) {
  const handleConfirm = async () => {
    let token = localStorage.getItem("token");
    deleteArticle(token, targetArticle.articleId, chapterId);

    setArticles(
      articles.filter((a) => a.articleId !== targetArticle.articleId)
    );
    setShowDeleteModal(false);
  };

  return (
    <Modal
      title="刪除章節"
      content={`確定要刪除「${targetArticle.title}」嗎？`}
      confirmHandler={handleConfirm}
      cancelHandler={() => setShowDeleteModal(false)}
    />
  );
}
