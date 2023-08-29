import ReactDOM  from "react-dom";
import classes from "./Modal.module.css"

const BackDrop = (props)=>{
return <div className={classes.backdrop} onClick={props.onClick}></div>;
}

const ModalOverlay = (props)=>{
    return (
      <div className={classes.modal}>
        <div>{props.children}</div>
      </div>
    );
}

const protalElement = document.getElementById("overlays");

const Modal = props =>{
    return (
      <>
        {ReactDOM.createPortal(
          <BackDrop onClick={props.onClose} />,
          protalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          protalElement
        )}
      </>
    );
}

export default Modal;