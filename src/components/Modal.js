import React from "react";
import ReactDOM from "react-dom";
import history from "../history";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      // hide modal
      onClick={() => history.push("/")}
      className="ui dimmer modals visible active"
    >
      <div
        // do not hide modal on click
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">Delete stream</div>
        <div className="content">Are you sure you want to delete stream?</div>
        <div className="actions">
          <button className="ui primary button">Delete</button>
          <button className="ui button">Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;

// Portals are used to create modal windows or to introduce React into some server-side rendered app
// Portal renders element as not a direct descendent of some component but somewhere else
