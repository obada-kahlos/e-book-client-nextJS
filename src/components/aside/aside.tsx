import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
const Aside = () => {
  return (
    <>
      <aside className="wish-list">
        <div className="header">
          <p className="text-[#222] font-bold"> Wish List </p>
          <span
            onClick={() => {
              "hi";
            }}
            className="btn btn-ghost btn-circle text-[#222]">
            <AiOutlineArrowRight />
          </span>
        </div>
        <div className="body"></div>
      </aside>
      <style>
        {`
            aside.wish-list{
                position : fixed;
                bottom : 0;
                right : 0;
                width : 400px;
                height : calc(100vh - 65.6px);
                background-color : #fff;
                z-index : 10;
                overflow-y : auto;
                overflow-x : hidden;
            }
            aside div.header{
                width: 100%;
                padding : 10px 20px;
                display : flex; 
                justify-content : space-between;
                align-items: center;
                border-bottom : 1px solid #333;
            }   
            `}
      </style>
    </>
  );
};

export default Aside;
