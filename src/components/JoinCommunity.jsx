import React from "react";

const JoinCommunity = () => {
  return (
    <div className="w-full">
      {/* Top Banner Section */}
      <div
        className="w-full text-center py-6  px-[12px] text-white"
        style={{
          background: "linear-gradient(to right, #54A176, #3C8576)",
        }}
      >
        <h1 className="text-[22px] font-bold md:font-semibold sm:text-4xl ">
          Join our{" "}
          <span className="font-bold md:font-semibold">WhatsApp Community</span>
        </h1>
        <p className="text-l mt-2">
          to get regular market updates and new investment opportunities
        </p>

        <button
  className="mt-3 text-lg text-white px-6 py-1 rounded-md"
  style={{
    backgroundColor: "#AC1C30",
    border: "3px solid #ffffff",
    borderRadius: "10px",
    boxShadow: "2px 3px 0px 0px #000000",
    transition: "all 0.1s ease-in-out",
  }}
  onClick={() => {
    window.open("https://chat.whatsapp.com/ExZUe5E55lgFgrKZbkNooS", "_blank");
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.boxShadow = "0px 1px 0px 0px #000000";
    e.currentTarget.style.transform = "translate(2px, 3px)";
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.boxShadow = "2px 3px 0px 0px #000000";
    e.currentTarget.style.transform = "translate(0px, 0px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "2px 3px 0px 0px #000000";
    e.currentTarget.style.transform = "translate(0px, 0px)";
  }}
  onTouchStart={(e) => {
    e.currentTarget.style.boxShadow = "0px 1px 0px 0px #000000";
    e.currentTarget.style.transform = "translate(2px, 3px)";
  }}
  onTouchEnd={(e) => {
    e.currentTarget.style.boxShadow = "2px 3px 0px 0px #000000";
    e.currentTarget.style.transform = "translate(0px, 0px)";
  }}
>
  Join Now
</button>


      </div>
    </div>
  );
};

export default JoinCommunity;
