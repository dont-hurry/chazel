import { useState } from "react";
import fontSizeOptions from "./data/font-size-options";
import lineHeightOptions from "./data/line-height-options";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import MainPage from "./pages/main";
import ReadingPage from "./pages/reading";
import Footer from "./components/Footer";

export default function App() {
  const [readingFontSize, setReadingFontSize] = useState(
    fontSizeOptions.default
  );
  const [readingLineHeight, setReadingLineHeight] = useState(
    lineHeightOptions.default
  );

  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/articles/">
            <ReadingPage
              fontSize={readingFontSize}
              setFontSize={setReadingFontSize}
              lineHeight={readingLineHeight}
              setLineHeight={setReadingLineHeight}
            />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
