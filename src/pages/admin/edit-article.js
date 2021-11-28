// TODO: button to reset the content
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";
import styles from "./base.module.css";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import Button from "../../components/UI/Button";
import { updateArticle } from "../../services/articles";

function getLocalStorageKey(articleId) {
  return `edit: ${articleId}`;
}

export default function EditArticlePage() {
  const formRef = useRef();

  const location = useLocation();
  if (!location.state) return null;

  const {
    articleId,
    seriesTitle,
    chapterTitle,
    article: { title, date, content },
  } = location.state;

  const storageKey = getLocalStorageKey(articleId);
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

  const handleReset = () => {
    if (window.confirm("你確定要重設為原始文章內容？")) {
      localStorage.removeItem(storageKey);
      window.location.reload();
    }
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      const formElement = formRef.current;
      const title = formElement.querySelector("#input-title").value;
      const date = formElement.querySelector("#input-date").value;
      const content = formElement.querySelector("#textarea-content").value;
      await updateArticle(articleId, { title, date, content });
      localStorage.removeItem(storageKey);
      window.history.back();
    }
  };

  return (
    <AdminLayout title="編輯文章" handleArrowLeftClick={handleCancel}>
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
            defaultValue={(previousData && previousData.title) || title}
            placeholder="文章標題"
          />
        </div>
        <div className={styles.formInputGroup}>
          <label htmlFor="input-date">發表日期</label>
          <Input
            id="input-date"
            defaultValue={(previousData && previousData.date) || date}
            placeholder="發表日期"
            type="date"
          />
        </div>
        <div className={styles.formInputGroup}>
          <label htmlFor="input-content">
            文章內容{previousData && <>（以下內回復自暫存）</>}
          </label>
          <Textarea
            id="textarea-content"
            defaultValue={(previousData && previousData.content) || content}
            placeholder="文章內容"
            rows="10"
          />
        </div>
        <div className={styles.formButtonGroup}>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleReset}>重設為原始文章內容</Button>
          <Button active onClick={handleSubmit}>
            新增
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
