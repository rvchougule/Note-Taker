/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import ChangeCase from "editorjs-change-case";
import Strikethrough from "@sotaproject/strikethrough";
import Checklist from "@editorjs/checklist";
import SimpleImage from "@editorjs/simple-image";
// import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import ColorPlugin from "editorjs-text-color-plugin";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";

const Editor = ({ note, setNote }) => {
  // console.log("note", note);
  const [ejInstance, setEjInstance] = useState(null);

  // const DEFAULT_INITIAL_DATA = {
  //   time: new Date().getTime(),
  //   blocks: note?.description || [],
  // };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      data: note?.description ? { blocks: note.description } : { blocks: [] }, // Initialize with note.description
      autofocus: true,
      onReady: () => {
        // ejInstance.current = editor;
        setEjInstance(editor);
      },

      // data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const content = await editor.saver.save();

        setNote((prevState) => ({
          ...prevState,
          description: content,
        }));
      },
      placeholder: "Let's take a note!",
      tools: {
        textAlignment: {
          class: AlignmentBlockTune,
          config: {
            default: "left",
            blocks: {
              header: "center",
            },
          },
        },
        paragraph: {
          class: Paragraph,
          tunes: ["textAlignment"],
        },
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ["textAlignment"],
          config: {
            placeholder: "Enter a Header",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },
        alert: {
          class: Alert,
          config: {
            defaultType: "primary",
            messagePlaceholder: "Enter something",
          },
        },
        list: {
          class: List,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
        },
        image: {
          class: SimpleImage,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
            },
          },
        },
        underline: {
          class: Underline,
        },
        strikethrough: {
          class: Strikethrough,
        },
        inlineCode: {
          class: InlineCode,
        },
        changeCase: {
          class: ChangeCase,
        },
        Color: {
          class: ColorPlugin, // or `window.ColorPlugin` if loaded from CDN
          config: {
            colorCollections: [
              "#EC7878",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#0070FF",
              "#03A9F4",
              "#00BCD4",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFF",
            ],
            defaultColor: "#FF1300",
            type: "text",
            customPicker: true,
          },
        },
        Marker: {
          class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
          config: {
            defaultColor: "#FFBF00",
            type: "marker",
            icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
          },
        },
      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance === null) {
      initEditor();
    }

    return () => {
      ejInstance?.destroy();
      // ejInstance.current = null;
      setEjInstance(null);
    };
  }, []);

  return (
    <>
      <div
        id="editorjs"
        className="block max-h-[20vw] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-2 overflow-y-scroll"
      ></div>
    </>
  );
};

export default Editor;
