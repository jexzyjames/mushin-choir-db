import App from "./App";
import useTheme from "./context/useTheme";
import { ToastContainer } from "react-toastify";

export default function AppRoot() {
  const { theme } = useTheme();

  return (
    <>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={4500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        limit={4}
        theme={theme}
        toastClassName="choir-toast"
        bodyClassName="choir-toast-body"
      />
    </>
  );
}
