import React, { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function Ellipsis({ item }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      onClick={handleToggleMenu}
      className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
    >
      <FaEllipsisVertical className="text-[18px]" />
    </div>
  );
}
