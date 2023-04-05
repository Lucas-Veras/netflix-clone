import LoadingSVG from "../../assets/whiteLoadingAdmin.svg";

const Loading = ({ width }) => {
  return (
    <>
      <img src={LoadingSVG} alt="loading" style={{ width: `${width}` }} />
    </>
  );
};

export default Loading;
