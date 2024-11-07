import {
  ArrowLeftCircle,
  LayoutDashboard,
  LucideInbox,
  PlusSquare,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function SideBar({ setTab }) {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <LayoutDashboard /> },
    { title: "Create Note", src: <PlusSquare /> },
    { title: "Inbox", src: <LucideInbox /> },
    { title: "Setting", src: <Settings /> },
  ];

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      }  h-screen p-5  pt-8 relative duration-300  shadow-md`}
    >
      <ArrowLeftCircle
        className={`absolute cursor-pointer top-9 mx-2
             ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />

      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-700 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} `}
            onClick={() => setTab(Menu.title)}
          >
            {Menu.src}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
