import { useParams, useHistory, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getSeriesById,
  getChaptersBySeriesId,
  createChapter,
  updateChapter,
  deleteChapter,
} from "../../services/articles";
import AdminLayout from "../../components/Layout/AdminLayout";
import Button from "../../components/UI/Button";
import styles from "./base.module.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";

export default function ChapterListPage() {
  const { seriesId } = useParams();

  let [seriesTitle, setSeriesTitle] = useState("");
  let [chapters, setChapters] = useState([]);
  let [showCreateModal, setShowCreateModal] = useState(false);
  let [showUpdateModal, setShowUpdateModal] = useState(false);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  // The target chapter for updating/deleting
  let [targetChapter, setTargetChapter] = useState(null);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const series = await getSeriesById(seriesId);
      const returnedChapters = await getChaptersBySeriesId(seriesId);

      setSeriesTitle(series.title);
      setChapters(returnedChapters);
    }

    fetchData();
  }, [seriesId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.replace("/");
  };

  return (
    <AdminLayout title={`章節列表：${seriesTitle}`}>
      <div className={styles.headerButtonsContainer}>
        <Button onClick={() => setShowCreateModal(true)}>新增章節</Button>
        <Button onClick={handleLogout}>登出</Button>
      </div>

      <div className={styles.tableHeader}>
        <div className={`${styles.tableRow} ${styles.tableGridChapterList}`}>
          <div>章節標題</div>
          <div>文章數量</div>
          <div>操作</div>
        </div>
      </div>

      <div className={styles.tableBody}>
        {chapters.map((chapter) => (
          <ChapterRow
            key={chapter.id}
            seriesId={seriesId}
            chapter={chapter}
            setShowUpdateModal={setShowUpdateModal}
            setShowDeleteModal={setShowDeleteModal}
            setTargetChapter={setTargetChapter}
          />
        ))}
      </div>

      {showCreateModal && (
        <CreateModal
          seriesId={seriesId}
          chapters={chapters}
          setChapters={setChapters}
          setShowCreateModal={setShowCreateModal}
        />
      )}

      {showUpdateModal && (
        <UpdateModal
          chapters={chapters}
          setChapters={setChapters}
          setShowUpdateModal={setShowUpdateModal}
          targetChapter={targetChapter}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          seriesId={seriesId}
          chapters={chapters}
          setChapters={setChapters}
          setShowDeleteModal={setShowDeleteModal}
          targetChapter={targetChapter}
        />
      )}
    </AdminLayout>
  );
}

function ChapterRow({
  seriesId,
  chapter,
  setShowUpdateModal,
  setShowDeleteModal,
  setTargetChapter,
}) {
  const { id: chapterId, title, articles } = chapter;

  const handleClickUpdate = (e) => {
    e.preventDefault(); // Prevent navigation
    setShowUpdateModal(true);
    setTargetChapter(chapter);
  };

  const handleClickDelete = (e) => {
    e.preventDefault(); // Prevent navigation
    setShowDeleteModal(true);
    setTargetChapter(chapter);
  };

  return (
    <Link
      to={`/admin/article-list/${seriesId},${chapterId}`}
      onKeyDown={(e) => e.preventDefault()} // Prevent navigation when pressing enter key
    >
      <div
        className={`${styles.tableRowWithBackground} ${styles.tableGridChapterList}`}
      >
        <div>{title}</div>
        <div>{articles.length}</div>
        <div className={styles.iconWrapper}>
          <PencilIcon onClick={handleClickUpdate} />
          <TrashIcon onClick={handleClickDelete} />
        </div>
      </div>
    </Link>
  );
}

function CreateModal({ seriesId, chapters, setChapters, setShowCreateModal }) {
  const formRef = useRef();

  const handleConfirm = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let formElement = formRef.current;
    const newChapter = {
      title: formElement.querySelector("input").value,
    };
    const returnedChapter = await createChapter(token, newChapter, seriesId);

    setChapters([...chapters, returnedChapter]);
    setShowCreateModal(false);
  };

  const content = (
    <form className={styles.form} ref={formRef} onSubmit={handleConfirm}>
      <div className={styles.formInputGroup}>
        <label htmlFor="chapter-input-title">章節標題</label>
        <Input id="chapter-input-title" placeholder="章節標題" />
      </div>
    </form>
  );

  return (
    <Modal
      title="新增章節"
      content={content}
      confirmHandler={handleConfirm}
      cancelHandler={() => setShowCreateModal(false)}
    />
  );
}

function UpdateModal({
  chapters,
  setChapters,
  setShowUpdateModal,
  targetChapter,
}) {
  const formRef = useRef();

  const handleConfirm = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let formElement = formRef.current;
    const newChapter = {
      ...targetChapter,
      title: formElement.querySelector("input").value,
    };
    await updateChapter(token, targetChapter.id, newChapter);

    setChapters(
      chapters.map((c) => (c.id !== targetChapter.id ? c : newChapter))
    );
    setShowUpdateModal(false);
  };

  const content = (
    <form className={styles.form} ref={formRef} onSubmit={handleConfirm}>
      <div className={styles.formInputGroup}>
        <label htmlFor="chapter-input-title">章節標題</label>
        <Input
          id="chapter-input-title"
          placeholder="章節標題"
          defaultValue={targetChapter.title}
        />
      </div>
    </form>
  );

  return (
    <Modal
      title="編輯章節"
      content={content}
      confirmHandler={handleConfirm}
      cancelHandler={() => setShowUpdateModal(false)}
    />
  );
}

function DeleteModal({
  seriesId,
  chapters,
  setChapters,
  setShowDeleteModal,
  targetChapter,
}) {
  const handleConfirm = async () => {
    let token = localStorage.getItem("token");
    deleteChapter(token, targetChapter.id, seriesId);

    setChapters(chapters.filter((c) => c.id !== targetChapter.id));
    setShowDeleteModal(false);
  };

  return (
    <Modal
      title="刪除章節"
      content={`確定要刪除「${targetChapter.title}」嗎？`}
      confirmHandler={handleConfirm}
      cancelHandler={() => setShowDeleteModal(false)}
    />
  );
}
