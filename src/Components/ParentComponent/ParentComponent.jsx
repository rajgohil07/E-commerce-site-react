import "./ParentComponent.css";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import { Provider } from "react-redux";
import { store } from "../../Redux/ReduxStore";

export const ParentComponent = () => {
  return (
    <Provider store={store}>
      <div className="parentFlex">
        <Navbar />
        <RouterComponent />
        <Footer />
      </div>
    </Provider>
  );
};
