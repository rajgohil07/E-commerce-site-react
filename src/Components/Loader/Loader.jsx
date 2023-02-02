import "./Loader.css";
import { Dna } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="loaderWrapper">
      <Dna
        visible={true}
        height="160"
        width="160"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper loader"
      />
    </div>
  );
};
