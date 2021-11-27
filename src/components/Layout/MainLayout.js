import styles from "./MainLayout.module.css";
import Header from "../Header";
import Navigation from "../Navigation";
import ScrollToTop from "../ScrollToTop";
import Footer from "../Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Navigation />
        <ScrollToTop />
        {children}
      </div>
      <Footer />
    </>
  );
}
