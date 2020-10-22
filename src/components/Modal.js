import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      // hide modal on click
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        // do not hide modal when click on modal message
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;

// Portals are used to create modal windows or to introduce React into some server-side rendered app
// Portal renders element as not a direct descendent of some component but somewhere else
