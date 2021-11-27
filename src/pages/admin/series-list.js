import { useState, useEffect, useRef } from "react";
import { getAllSeries, createSeries } from "../../services/articles";
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
  let [showCreateModal, setShowCreateModal] = useState(true);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [showUpdateModal, setShowUpdateModal] = useState(false);
  let [targetSeries, setTargetSeries] = useState(null); // The target series for editing/removing

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
        <CreateModal setShowCreateModal={setShowCreateModal} />
      )}

      {showUpdateModal && (
        <UpdateModal
          targetSeries={targetSeries}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          targetSeries={targetSeries}
          setShowDeleteModal={setShowDeleteModal}
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
    e.preventDefault();
    setShowUpdateModal(true);
    setTargetSeries(series);
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
    setTargetSeries(series);
  };

  return (
    <Link to={`/admin/chapter-list/${seriesId}`}>
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

function CreateModal({ setShowCreateModal }) {
  const formRef = useRef();

  const handleSubmit = () => {
    let formEl = formRef.current;

    const newSeries = {
      title: formEl.querySelector("input").value,
      showChapterButtons: formEl.querySelector("select").value === "true",
    };

    createSeries(newSeries);
  };

  const content = (
    <form className={styles.form} ref={formRef}>
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
      confirmHandler={handleSubmit}
      cancelHandler={() => setShowCreateModal(false)}
    />
  );
}

function UpdateModal({ targetSeries, setShowUpdateModal }) {
  return (
    <Modal
      title="編輯系列"
      content={JSON.stringify(targetSeries)}
      cancelHandler={() => setShowUpdateModal(false)}
    />
  );
}

function DeleteModal({ targetSeries, setShowDeleteModal }) {
  return (
    <Modal
      title="刪除系列"
      content={`你確定要刪除「${targetSeries.title}」？`}
      confirmHandler={() => console.log("todo")}
      cancelHandler={() => setShowDeleteModal(false)}
    />
  );
}
