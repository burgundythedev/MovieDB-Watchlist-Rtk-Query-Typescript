import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div style={{ height: '100vh' }}>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);
