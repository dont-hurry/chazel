import AdminLayout from "../components/Layout/AdminLayout";
import styles from "./login.module.css";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../services/user";

export default function LoginPage() {
  return (
    <AdminLayout title="登入">
      <div className={styles.container}>
        <LoginForm />
      </div>
    </AdminLayout>
  );
}

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef();
  const history = useHistory();

  const handleClear = () => {
    const formElement = formRef.current;
    formElement.querySelector("#input-username").value = "";
    formElement.querySelector("#input-password").value = "";
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = formRef.current;
    const username = formElement.querySelector("#input-username").value;
    const password = formElement.querySelector("#input-password").value;

    try {
      const { token: returnedToken } = await login(username, password);
      localStorage.setItem("token", returnedToken);
      history.replace("/admin/series-list");
    } catch (error) {
      const { errorMessage } = error.response.data;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      {errorMessage && (
        <div className={styles.formErrorMessage}>{errorMessage}</div>
      )}
      <div className={styles.formInputGroup}>
        <label>帳號</label>
        <Input id="input-username" />
      </div>
      <div className={styles.formInputGroup}>
        <label>密碼</label>
        <Input id="input-password" type="password" />
      </div>
      <div className={styles.formButtonGroup}>
        <Button onClick={handleClear}>清除</Button>
        <Button active submit>
          登入
        </Button>
      </div>
    </form>
  );
}
