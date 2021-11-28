import { useState } from "react";
import {
  fontSizeOptions,
  lineHeightOptions,
} from "./constants/reading-options";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./pages/main";
import ReadingPage from "./pages/reading";
import LoginPage from "./pages/login";
import AuthRedirectRoute from "./components/helpers/AuthRedirectRoute";
import SeriesListPage from "./pages/admin/series-list";
import ChapterListPage from "./pages/admin/chapter-list";
import ArticleListPage from "./pages/admin/article-list";
import CreateArticlePage from "./pages/admin/create-article";
import EditArticlePage from "./pages/admin/edit-article";

export default function App() {
  // These states are used in the `ReadingPage` component. If we put them in the
  // `ReadingPage` component, they will disappear when the `ReadingPage`
  // component unmounts.
  const [readingFontSize, setReadingFontSize] = useState(
    fontSizeOptions.defaultValue
  );
  const [readingLineHeight, setReadingLineHeight] = useState(
    lineHeightOptions.defaultValue
  );

  return (
    <Router>
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
        <Route path="/login">
          <LoginPage />
        </Route>
        <AuthRedirectRoute path="/admin/series-list">
          <SeriesListPage />
        </AuthRedirectRoute>
        <AuthRedirectRoute path="/admin/chapter-list/:seriesId">
          <ChapterListPage />
        </AuthRedirectRoute>
        <AuthRedirectRoute path="/admin/article-list/:seriesId,:chapterId">
          <ArticleListPage />
        </AuthRedirectRoute>
        <AuthRedirectRoute path="/admin/create-article">
          <CreateArticlePage />
        </AuthRedirectRoute>
        <AuthRedirectRoute path="/admin/edit-article">
          <EditArticlePage />
        </AuthRedirectRoute>
      </Switch>
    </Router>
  );
}
