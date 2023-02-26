import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className,
  button,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };
  if (button) {
    return (
      <button className={className} onClick={onClick}>
        {buttonText}
      </button>
    );
  } else {
    return (
      <i className="fa fa-shopping-cart n-r-link" size="m" onClick={onClick} />
    );
  }
}

export default OpenModalButton;
