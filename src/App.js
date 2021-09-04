import styles from "./App.module.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/main";
import ReadingPage from "./pages/reading";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <Router>
          <Header />
          <Navigation />

          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/articles/:path/:articleId/">
              <ReadingPage />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
}
