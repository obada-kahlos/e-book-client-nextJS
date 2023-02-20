import React, { ReactElement } from "react";

interface popupModal {
  id: string;
  children: ReactElement | ReactElement[];
}

const Popup: React.FC<popupModal> = (props) => {
  return (
    <div>
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={props.id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
