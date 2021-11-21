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
  // - These states are used in the `ReadingPage` component.
  // - We put them here (instead the of `ReadingPage` component) because if the
  //   `ReadingPage` component unmounts, the state will be lost.
  const [readingFontSize, setReadingFontSize] = useState(
    fontSizeOptions.defaultValue
  );
  const [readingLineHeight, setReadingLineHeight] = useState(
    lineHeightOptions.defaultValue
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
