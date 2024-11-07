import { Delete, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import Content from "./Content";

/* eslint-disable react/prop-types */
export default function Note({ data, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);

  // console.log(data);
  // Array of gradient backgrounds
  const gradients = [
    "bg-gradient-to-r from-indigo-100 to-indigo-300",
    "bg-gradient-to-r from-blue-100 to-blue-300",
    "bg-gradient-to-r from-green-100 to-green-300",
    "bg-gradient-to-r from-purple-100 to-purple-300",
    "bg-gradient-to-r from-pink-100 to-pink-300",
    "bg-gradient-to-r from-yellow-100 to-yellow-300",
  ];

  // Randomly select a gradient
  const [randomGradient, setRandomGradient] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    setRandomGradient(gradients[randomIndex]);
  }, []);
  return (
    <div
      className={`relative flex flex-col gap-2 justify-start min-w-48 max-w-[25%] rounded-lg border-2 border-indigo-400  p-4 shadow-lg hover:shadow-2xl transition-shadow duration-200 ${randomGradient}`}
      onClick={() => setContentOpen(true)}
    >
      <h1 className="text-2xl font-bold text-indigo-700">{data.title}</h1>
      <div className="text-md text-indigo-900">{`${data.description.substr(
        0,
        100
      )}...`}</div>

      {/* Three-dot menu button */}
      <div className="absolute bottom-2 right-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          &#x22EE; {/* Vertical ellipsis (three dots) */}
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 bottom-8 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(data);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-100 rounded-md"
            >
              <Edit />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(data._id);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md"
            >
              <Delete />
            </button>
          </div>
        )}
      </div>
      {contentOpen && (
        <Content
          data={data}
          setContentOpen={setContentOpen}
          randomGradient={randomGradient}
        />
      )}
    </div>
  );
}
