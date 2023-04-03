import Loading from "../../assets/whiteLoading.svg";

interface IWhiteLoading {
  width: string;
}

const WhiteLoading = ({ width }: IWhiteLoading) => {
  return (
    <>
      <img src={Loading} alt="loading" style={{ width: `${width}` }} />
    </>
  );
};

export default WhiteLoading;
