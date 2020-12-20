const Backdrop = ({ onClickHandler }) => {
  const clickHandler = () => {
    if (onClickHandler) {
      onClickHandler();
    }
  };

  return <div onClick={clickHandler} className="backdrop"></div>;
};

export default Backdrop;
