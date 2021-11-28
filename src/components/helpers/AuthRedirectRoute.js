import RedirectRoute from "./RedirectRoute";

export default function AuthRedirectRoute({ path, children }) {
  const token = localStorage.getItem("token");

  return (
    <RedirectRoute
      path={path}
      redirectCondition={token === null}
      redirectTo="/login"
    >
      {children}
    </RedirectRoute>
  );
}
