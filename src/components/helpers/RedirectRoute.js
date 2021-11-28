import { Route, Redirect } from "react-router-dom";

// If `condition` is `true`, then redirects to `redirectTo`, otherwise returns
// the fallback component specified in `children`.
export default function RedirectRoute({
  path,
  redirectCondition,
  redirectTo,
  children,
}) {
  return (
    <Route
      path={path}
      render={() => {
        if (redirectCondition) {
          return <Redirect to={redirectTo} />;
        } else {
          return children;
        }
      }}
    />
  );
}
