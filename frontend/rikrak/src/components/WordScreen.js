import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import socket from "../Sockets/socket";
import "./style/WordScreen.css";

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
];

const WordScreen = ({ display, roomId }) => {
    const [quill, setQuill] = useState();
    const documentId = roomId;

    useEffect(() => {
        if (!!!socket || !!!quill) {
            return;
        }

        socket.once("loadDocument", (document) => {
            quill.setContents(document);
            quill.enable();
        });

        socket.emit("getDocument", documentId);
        // eslint-disable-next-line
    }, [socket, quill, documentId]);

    useEffect(() => {
        if (!!!socket === null || !!!quill) return;

        const deltaHandler = (delta, oldDelta, source) => {
            if (source !== "user") return;

            // send whatever changed in our client to the server
            socket.emit("sendChanges", delta);
        };

        quill.on("text-change", deltaHandler);

        return () => {
            quill.off("text-change", deltaHandler);
        };
        // eslint-disable-next-line
    }, [socket, quill]);

    useEffect(() => {
        if (!!!socket === null || !!!quill) return;

        const deltaHandler = (delta) => {
            quill.updateContents(delta);
        };

        socket.on("receiveChanges", deltaHandler);

        return () => {
            socket.off("receiveChanges", deltaHandler);
        };
        // eslint-disable-next-line
    }, [socket, quill]);

    const quillWrapperRef = useCallback((wrapper) => {
        if (wrapper === null) return;

        wrapper.innerHTML = "";

        // create a random div that hosts the quill editor and gets re-instantiated everytime the useEffect finishes running
        const editor = document.createElement("div");

        // put this re-creatable editor inside our Quill-container
        wrapper.append(editor);

        // quill puts everything inside this editor which recreated everytime useEffect quits
        const q = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        });
        q.disable();
        q.setText("Loading...");
        setQuill(q);
    }, []);

    return (
        <div
            className={
                display ? "quill-container" : "quill-container quill-container-none"
            }
            ref={quillWrapperRef}
        ></div>
    );
};

export default WordScreen;
