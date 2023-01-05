import React from "react";

import colors from "../../../assets/theme/colors";

const DisplayDocs = ({
  docs,
  setDocs,
  isLoadFolder,
  setIsLoadFolder,
  addedData,
}) => {
  return (
    <React.Fragment>
      <div className="display-docs">
        {docs.length === 0 ? (
          <div className="no-content">
            {isLoadFolder && <span>No file processed</span>}
          </div>
        ) : (
          <div className="">
            <div className="processed-files">
              {docs.length} {docs.length === 1 ? "file" : "files"} processed,{" "}
              <span style={{ color: colors.success, fontWeight: "bold" }}>
                {
                  docs.filter((doc) =>
                    doc.promptMatch.toLowerCase().includes("yes")
                  ).length
                }{" "}
                match found.
              </span>
            </div>
            <div className="all-docs">
              {docs.map((doc, key) => (
                <div
                  className="each-doc"
                  key={key}
                  style={{
                    borderColor: doc.promptMatch.toLowerCase().includes("yes")
                      ? colors.success
                      : colors.danger,
                  }}
                >
                  <h4 style={{ textAlign: "left" }}>
                    Filename: {doc.fileName}
                  </h4>
                  <div className="text">
                    Match Criteria:{" "}
                    {doc.promptMatch.toLowerCase().includes("yes")
                      ? "Yes"
                      : "No"}
                  </div>
                  {doc.promptMatch.toLowerCase().includes("yes") &&
                    doc.extractData.length > 0 && (
                      <ul className="text">
                        {doc.extractData
                          .split(/[A-Z]{1}[a-z]+:/)
                          .slice(1)
                          .map((data, key) => (
                            <li key={key}>
                              <span style={{ textTransform: "capitalize" }}>
                                {" "}
                              </span>
                              <span>{data}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DisplayDocs;
