import React, { ReactElement, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { toggleIsEdit, toggleIsOpen } from "@/app/slices/user.slice";
import { AiOutlineClose } from "react-icons/ai";

interface PopupProps {
  open: boolean;
  children: ReactElement | ReactElement[];
}

const Popup: React.FC<PopupProps> = ({ open, children }) => {
  const dispatch = useAppDispatch();
  const [animate, setAnimate] = useState(false);
  const handleClose = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      dispatch(toggleIsOpen(false));
      dispatch(toggleIsEdit(false));
    }, 300);
  };

  return (
    <>
      {open && (
        <div className="popup-overlay" onClick={handleClose}>
          <div
            className={`popup bg-blue-100 ${animate ? "popup-animate" : ""}`}
            onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-[-15px] right-[-15px]">
              <button
                className="w-[50px] h-[50px] flex items-center justify-center transition-all hover:bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(0,0,0,0.4)] bg-[rgba(0,0,0,0.2)] btn-circle text-[18px]"
                onClick={handleClose}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="">{children}</div>
          </div>
        </div>
      )}
      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index : 9999;
          }
          .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            height : auto;
          }
          @media(max-width : 600px){
            .popup {
              width : 90%
            }
          }  
          .popup-animate {
            animation: popup-out .3s forwards;
          }
          @keyframes popup-out {
            from { transform: translate(-50%, -50%);   opacity: ; 1 }
            to { transform: translate(-50%, -120%); opacity: ; 0}
          }
        `}
      </style>
    </>
  );
};

export default Popup;
