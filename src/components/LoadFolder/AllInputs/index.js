import React, { useState, useRef } from "react";

const AllInputs = ({
  addFiles,
  addedData,
  setAddedData,
  prompt,
  setPrompt,
  docType,
  docTypes,
  setDocType,
}) => {
  const [allowMultiple, setAllowMultiple] = useState(true);

  const searchDataRef = useRef();

  const inputOnClick = (e) => {
    e.target.value = "";
  };

  const handleAddData = () => {
    if (!searchDataRef.current.value) return;
    setAddedData((prev) => [...prev, searchDataRef.current.value]);

    setTimeout(() => {
      searchDataRef.current.value = "";
    }, 10);
  };

  return (
    <React.Fragment>
      <div className="all-inputs">
        <div className="textarea">
          <textarea
            placeholder="Your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <div className="textarea-warning">
            Make sure you quote all the key words you want to match <br />
            e.g: does the text contain{" "}
            <strong>'excel, micosoft word, powerpoint'</strong>
          </div>
        </div>
        <div className="doc-type-checkbox">
          <div className="doc-type">
            <span>Document Type: </span>

            <select
              name=""
              id=""
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              {docTypes.map((doc, key) => (
                <option key={key}>{doc.name}</option>
              ))}
            </select>
          </div>
          <div className="allow-multiple">
            <input
              type="checkbox"
              name=""
              checked={allowMultiple}
              onChange={() => setAllowMultiple((prev) => !prev)}
              id="allow-multiple"
            />
            <label htmlFor="allow-multiple">Allow multiple files</label>
          </div>
        </div>
        <div className="search-data">
          <input
            ref={searchDataRef}
            type="text"
            placeholder="Enter data to extract..."
          />
          <button onClick={handleAddData}>Add</button>
        </div>

        <div className="added-data">
          <div>
            {addedData.length === 0 ? (
              <span style={{ color: "red" }}></span>
            ) : (
              <div>
                Data to search for:
                {[...addedData].map((data, key) => (
                  <i key={key}>{data}</i>
                ))}
              </div>
            )}
          </div>
          {addedData.length > 0 && (
            <div className="clear-all" onClick={() => setAddedData([])}>
              Clear All
            </div>
          )}
        </div>
        <div className="input">
          <label
            htmlFor="load-folder-input"
            style={{
              color: !prompt && "grey",
              cursor: !prompt && "not-allowed",
              border: !prompt && "none",
            }}
          >
            Choose folder
          </label>
          {allowMultiple ? (
            <input
              className="file"
              type="file"
              id="load-folder-input"
              onChange={addFiles}
              webkitdirectory=""
              directory=""
              onClick={inputOnClick}
              disabled={prompt ? false : true}
            />
          ) : (
            <input
              className="file"
              type="file"
              id="load-folder-input"
              onChange={addFiles}
              onClick={inputOnClick}
              disabled={prompt ? false : true}
            />
          )}
        </div>
        <div className="warning">
          Only <strong>word documents</strong> will be processed
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllInputs;
