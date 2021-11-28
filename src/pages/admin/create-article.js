import { useRef } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";
import styles from "./base.module.css";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import Button from "../../components/UI/Button";
import { createArticle } from "../../services/articles";

function getLocalStorageKey(seriesId, chapterId) {
  return `${seriesId},${chapterId}`;
}

export default function AddArticlePage() {
  const formRef = useRef();

  const location = useLocation();
  if (!location.state) return null;

  const { seriesId, chapterId, seriesTitle, chapterTitle } = location.state;
  const storageKey = getLocalStorageKey(seriesId, chapterId);
  let previousData = localStorage.getItem(storageKey);
  previousData = previousData && JSON.parse(previousData);

  const handleCancel = () => {
    if (formRef.current) {
      const formElement = formRef.current;
      const title = formElement.querySelector("#input-title").value;
      const date = formElement.querySelector("#input-date").value;
      const content = formElement.querySelector("#textarea-content").value;

      localStorage.setItem(
        storageKey,
        JSON.stringify({ title, date, content })
      );
    }

    window.history.back();
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      let token = localStorage.getItem("token");
      const formElement = formRef.current;
      const title = formElement.querySelector("#input-title").value;
      const date = formElement.querySelector("#input-date").value;
      const content = formElement.querySelector("#textarea-content").value;

      await createArticle(token, { title, date, content }, chapterId);

      localStorage.removeItem(storageKey);
      window.history.back();
    }
  };

  return (
    <AdminLayout title="新增文章" handleArrowLeftClick={handleCancel}>
      <form className={styles.form} ref={formRef}>
        <div className={styles.formInputGroup}>
          <label>系列</label>
          <Input defaultValue={seriesTitle} disabled />
        </div>
        <div className={styles.formInputGroup}>
          <label>章節</label>
          <Input defaultValue={chapterTitle} disabled />
        </div>
        <div className={styles.formInputGroup}>
          <label htmlFor="input-title">文章標題</label>
          <Input
            id="input-title"
            defaultValue={previousData && previousData.title}
            placeholder="文章標題"
          />
        </div>
        <div className={styles.formInputGroup}>
          <label htmlFor="input-date">發表日期</label>
          <Input
            id="input-date"
            defaultValue={previousData && previousData.date}
            placeholder="發表日期"
            type="date"
          />
        </div>
        <div className={styles.formInputGroup}>
          <label htmlFor="input-content">文章內容</label>
          <Textarea
            id="textarea-content"
            defaultValue={previousData && previousData.content}
            placeholder="文章內容"
            rows="10"
          />
        </div>
        <div className={styles.formButtonGroup}>
          <Button onClick={handleCancel}>取消</Button>
          <Button active onClick={handleSubmit}>
            新增
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
