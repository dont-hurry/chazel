import styles from "./App.module.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/main";
import ReadingPage from "./pages/reading";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/articles/:path/:articleId/:title?">
            <ReadingPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
