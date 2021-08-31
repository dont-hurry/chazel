import styles from "./App.module.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Navigation />
      <Main />
      <Footer />
    </div>
  );
}
