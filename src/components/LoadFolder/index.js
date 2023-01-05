import React, { useState, useRef } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

import searchModel from "../../helpers/searchModel";

import "./styles.css";
import AllInputs from "./AllInputs";
import DisplayDocs from "./DisplayDocs";
import Overlay from "../Overlay";

const Scanner = () => {
  const [docs, setDocs] = useState([]);
  const [isLoadFolder, setIsLoadFolder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedData, setAddedData] = useState([]);
  const [docType, setDocType] = useState("Resume");
  const [prompt, setPrompt] = useState("");

  const docTypes = [
    {
      name: "Resume",
      keywords: [
        "activities",
        "hobbies",
        "experience",
        "objective",
        "reference",
        "skill",
        "education",
        "work",
      ],
    },
  ];

  const addFiles = async (e) => {
    setDocs([]);
    const files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      const fileType = file.name.split(".").slice(-1)[0];
      const fileName = file.name.split(".").slice(0, -1).join("");

      try {
        setLoading((prev) => !prev);
        if (
          (fileType === "docx" || fileType === "doc") &&
          file.name[0] !== "~"
        ) {
          var reader = new FileReader();
          reader.onload = async (e) => {
            const content = e.target.result;
            // console.log(e.target.result);
            var doc = new Docxtemplater(new PizZip(content), {
              delimiters: {
                start: "12op1j2po1j2poj1po",
                end: "op21j4po21jp4oj1op24j",
              },
            });

            var text = doc.getFullText();

            let count = 0;
            const allkeywords = docTypes.filter(
              (doc) => doc.name === docType
            )[0];

            allkeywords.keywords.forEach((keyword) => {
              if (text.includes(keyword)) {
                count++;
              }
            });

            const countPerc = (count * 100) / allkeywords.keywords.length;

            if (countPerc >= 35) {
              const promptMatch = await searchModel(prompt, text);
              let extractData = false;
              if (addedData.length > 0) {
                extractData = await searchModel(
                  `Extract ${addedData.join(", ")}.`,
                  text
                );
              }

              setDocs((prev) => [
                ...prev,
                {
                  fileName: fileName.replace(/_|\.|-|\*/g, " "),
                  text: text,
                  promptMatch,
                  extractData,
                },
              ]);
              setLoading((prev) => !prev);
            }
          };
          reader.readAsArrayBuffer(file);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setIsLoadFolder(true);
    // setLoading((prev) => !prev);
  };

  return (
    <div className="load-folder-wrapper">
      {loading && <Overlay />}

      <>
        <AllInputs
          addedData={addedData}
          setAddedData={setAddedData}
          prompt={prompt}
          docType={docType}
          docTypes={docTypes}
          setDocType={setDocType}
          setPrompt={setPrompt}
          addFiles={addFiles}
        />
      </>
      <>
        <DisplayDocs
          docs={docs}
          setDocs={setDocs}
          isLoadFolder={isLoadFolder}
          setIsLoadFolder={setIsLoadFolder}
          addedData={addedData}
        />
      </>
    </div>
  );
};

export default Scanner;
