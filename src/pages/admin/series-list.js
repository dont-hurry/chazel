import { useState, useEffect, useRef } from "react";
import {
  getAllSeries,
  createSeries,
  updateSeries,
  deleteSeries,
} from "../../services/articles";
import AdminLayout from "../../components/Layout/AdminLayout";
import Button from "../../components/UI/Button";
import styles from "./base.module.css";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import Select from "../../components/UI/Select";

export default function SeriesListPage() {
  let [allSeries, setAllSeries] = useState([]);
  let [showCreateModal, setShowCreateModal] = useState(false);
  let [showUpdateModal, setShowUpdateModal] = useState(false);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  // The target series for updating/deleting
  let [targetSeries, setTargetSeries] = useState(null);

  useEffect(() => {
    getAllSeries().then((returnedData) => setAllSeries(returnedData));
  }, []);

  return (
    <AdminLayout title="系列列表">
      <Button onClick={() => setShowCreateModal(true)}>新增系列</Button>

      <div className={styles.tableHeader}>
        <div className={`${styles.tableRow} ${styles.tableGridSeriesList}`}>
          <div>系列標題</div>
          <div>章節數量</div>
          <div>顯示章節切換按鈕</div>
          <div>操作</div>
        </div>
      </div>

      <div className={styles.tableBody}>
        {allSeries.map((series) => (
          <SeriesRow
            key={series.id}
            series={series}
            setShowUpdateModal={setShowUpdateModal}
            setShowDeleteModal={setShowDeleteModal}
            setTargetSeries={setTargetSeries}
          />
        ))}
      </div>

      {showCreateModal && (
        <CreateModal
          allSeries={allSeries}
          setAllSeries={setAllSeries}
          setShowCreateModal={setShowCreateModal}
        />
      )}

      {showUpdateModal && (
        <UpdateModal
          allSeries={allSeries}
          setAllSeries={setAllSeries}
          setShowUpdateModal={setShowUpdateModal}
          targetSeries={targetSeries}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          allSeries={allSeries}
          setAllSeries={setAllSeries}
          setShowDeleteModal={setShowDeleteModal}
          targetSeries={targetSeries}
        />
      )}
    </AdminLayout>
  );
}

function SeriesRow({
  series,
  setShowUpdateModal,
  setShowDeleteModal,
  setTargetSeries,
}) {
  const { id: seriesId, title, chapters, showChapterButtons } = series;

  const handleClickUpdate = (e) => {
    e.preventDefault(); // Prevent navigation
    setShowUpdateModal(true);
    setTargetSeries(series);
  };

  const handleClickDelete = (e) => {
    e.preventDefault(); // Prevent navigation
    setShowDeleteModal(true);
    setTargetSeries(series);
  };

  return (
    <Link
      to={`/admin/chapter-list/${seriesId}`}
      onKeyDown={(e) => e.preventDefault()} // Prevent navigation when pressing enter key
    >
      <div
        className={`${styles.tableRowWithBackground} ${styles.tableGridSeriesList}`}
      >
        <div>{title}</div>
        <div>{chapters.length}</div>
        <div>{showChapterButtons ? "是" : "否"}</div>
        <div className={styles.iconWrapper}>
          <PencilIcon onClick={handleClickUpdate} />
          <TrashIcon onClick={handleClickDelete} />
        </div>
      </div>
    </Link>
  );
}

function CreateModal({ allSeries, setAllSeries, setShowCreateModal }) {
  const formRef = useRef();

  const handleConfirm = async (e) => {
    e.preventDefault();

    let formElement = formRef.current;
    const newSeries = {
      title: formElement.querySelector("input").value,
      showChapterButtons: formElement.querySelector("select").value === "true",
    };
    const returnedSeries = await createSeries(newSeries);

    setAllSeries([...allSeries, returnedSeries]);
    setShowCreateModal(false);
  };

  const content = (
    <form className={styles.form} ref={formRef} onSubmit={handleConfirm}>
      <div className={styles.formInputGroup}>
        <label htmlFor="series-input-title">系列標題</label>
        <Input id="series-input-title" placeholder="系列標題" />
      </div>
      <div className={styles.formInputGroup}>
        <label htmlFor="series-select-show-chapter-buttons">
          顯示章節切換按鈕
        </label>
        <Select id="series-select-show-chapter-buttons">
          <option value="true">是</option>
          <option value="false">否</option>
        </Select>
      </div>
    </form>
  );

  return (
    <Modal
      title="新增系列"
      content={content}
      confirmHandler={handleConfirm}
      cancelHandler={() => setShowCreateModal(false)}
    />
  );
}

function UpdateModal({
  allSeries,
  setAllSeries,
  setShowUpdateModal,
  targetSeries,
}) {
  const formRef = useRef();

  const handleConfirm = async (e) => {
    e.preventDefault();

    let formElement = formRef.current;
    const newSeries = {
      ...targetSeries,
      title: formElement.querySelector("input").value,
      showChapterButtons: formElement.querySelector("select").value === "true",
    };
    await updateSeries(targetSeries.id, newSeries);

    setAllSeries(
      allSeries.map((s) => (s.id !== targetSeries.id ? s : newSeries))
    );
    setShowUpdateModal(false);
  };

  const content = (
    <form className={styles.form} ref={formRef} onSubmit={handleConfirm}>
      <div className={styles.formInputGroup}>
        <label htmlFor="series-input-title">系列標題</label>
        <Input
          id="series-input-title"
          placeholder="系列標題"
          defaultValue={targetSeries.title}
        />
      </div>
      <div className={styles.formInputGroup}>
        <label htmlFor="series-select-show-chapter-buttons">
          顯示章節切換按鈕
        </label>
        <Select
          id="series-select-show-chapter-buttons"
          defaultValue={targetSeries.showChapterButtons}
        >
          <option value="true">是</option>
          <option value="false">否</option>
        </Select>
      </div>
    </form>
  );

  return (
    <Modal
      title="編輯系列"
      content={content}
      confirmHandler={handleConfirm}
      cancelHandler={() => setShowUpdateModal(false)}
    />
  );
}

function DeleteModal({
  allSeries,
  setAllSeries,
  setShowDeleteModal,
  targetSeries,
}) {
  const handleConfirm = async () => {
    deleteSeries(targetSeries.id);

    setAllSeries(allSeries.filter((s) => s.id !== targetSeries.id));
    setShowDeleteModal(false);
  };

  return (
    <Modal
      title="刪除系列"
      content={`確定要刪除「${targetSeries.title}」嗎？`}
      confirmHandler={handleConfirm}
      cancelHandler={() => setShowDeleteModal(false)}
    />
  );
}
