/* eslint-disable react/prop-types */
import { Search, Bell } from "lucide-react";

export default function Navbar({ user }) {
  return (
    <div className="sticky top-0  flex  w-full items-center justify-between px-4 py-2 shadow-lg bg-white ">
      <span className="text-sm lg:text-xl  font-bold ">NoteTaker</span>
      <div className="flex gap-2 w-96 text-neutral-400 ml-8 items-center rounded-full px-4  shadow-md ">
        <Search className="w-4" />
        <input
          className=" focus:ring-0 focus:ring-offset-0 bg-transparent border-none"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="flex items-center justify-between gap-2 ">
        <Bell className="w-12" />
        <span className="text-xl font-bold rounded-full border-2 px-2 py-1 bg-orange-700 ">
          {user?.fullName[0]?.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
