import { Provider } from "react-redux";
import { ParentComponent } from "./Components/ParentComponent/ParentComponent";
import { store } from "./Redux/ReduxStore";

export const App = () => {
  return (
    <Provider store={store}>
      <ParentComponent />
    </Provider>
  );
};
