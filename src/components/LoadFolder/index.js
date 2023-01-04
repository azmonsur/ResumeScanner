import React, { useState } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

import "./styles.css";

const Scanner = () => {
  const [docs, setDocs] = useState([]);
  const [isLoadFolder, setIsLoadFolder] = useState(false);

  const inputOnClick = (e) => {
    e.target.value = "";
  };

  const addFiles = (e) => {
    setDocs([]);
    const files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      const fileType = file.name.split(".").slice(-1)[0];
      const fileName = file.name.split(".").slice(0, -1).join("");

      if ((fileType === "docx" || fileType === "doc") && file.name[0] !== "~") {
        var reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target.result;
          var doc = new Docxtemplater(new PizZip(content), {
            delimiters: {
              start: "12op1j2po1j2poj1po",
              end: "op21j4po21jp4oj1op24j",
            },
          });

          var text = doc.getFullText();
          setDocs((prev) => [...prev, { fileName, text }]);
        };
        reader.readAsArrayBuffer(file);
      }
    }

    setIsLoadFolder(true);
  };

  return (
    <div className="load-folder-wrapper">
      <div className="input">
        <label htmlFor="load-folder-input">Choose folder</label>
        <input
          type="file"
          id="load-folder-input"
          onChange={addFiles}
          multiple
          webkitdirectory=""
          directory=""
          onClick={inputOnClick}
        />
      </div>
      <div className="warning">
        Only <strong>word documents</strong> will be processed
      </div>
      <div className="display-docs">
        {docs.length === 0 ? (
          <div className="no-content">
            {isLoadFolder && <span>No file processed</span>}
          </div>
        ) : (
          <div className="">
            <div className="processed-files">
              {docs.length} {docs.length === 1 ? "file" : "files"} processed.
            </div>
            <div className="all-docs">
              {docs.map((doc, key) => (
                <div className="each-doc" key={key}>
                  <h4>{doc.fileName}</h4>
                  <div className="text">{doc.text.slice(0, 300)}...</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
