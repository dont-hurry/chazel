import { useLocation } from "react-router-dom";
import AdminLayout from "../../components/Layout/AdminLayout";
import styles from "./base.module.css";
import Input from "../../components/UI/Input";

export default function AddArticlePage() {
  const location = useLocation();
  if (!location.state) return null;

  const { seriesId, chapterId, seriesTitle, chapterTitle } = location.state;

  return (
    <AdminLayout title="新增文章">
      <form>
        <div className={styles.formGrid}>
          <div>系列</div>
          <div>{seriesTitle}</div>
          <div>章節</div>
          <div>{chapterTitle}</div>
          <div>標題</div>
          <div>
            <Input />
          </div>
          <div>日期</div>
          <div>
            <Input />
          </div>
          <div>內容</div>
          <div>{chapterTitle}</div>
        </div>
      </form>
    </AdminLayout>
  );
}
