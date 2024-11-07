import { CrossIcon } from "lucide-react";
import { createPortal } from "react-dom";

export default function Content({ data, setContentOpen, randomGradient }) {
  return createPortal(
    <div
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-full h-screen "
      onClick={() => setContentOpen(false)}
    >
      <div
        className={`mt-4 flex flex-col gap-2 w-full max-w-[70vw] max-h-screen p-4 text-black border-2 ring-gray-300 rounded-md ${randomGradient}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <CrossIcon
            className="w-12 cursor-pointer rotate-45"
            onClick={() => setContentOpen(false)}
          />
        </div>
        <p className="overflow-y-scroll">{data.description}</p>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
