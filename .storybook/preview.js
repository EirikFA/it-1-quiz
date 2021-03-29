// Importing all pages, as they include the CSS required for all components
import "@components/App/UnauthenticatedApp.scss";
import "@components/App/AuthenticatedApp.scss";
import "@fortawesome/fontawesome-free/css/all.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
