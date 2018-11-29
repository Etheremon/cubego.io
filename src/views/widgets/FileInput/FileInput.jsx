import React from "react"
import PropTypes from 'prop-types';

require("style-loader!./FileInput.scss");

export const ImportFromFile = ({handleData, text}) => {
  let fileReader;

  const handleFileRead = (e) => {
      const content = fileReader.result;
      if (handleData) {
        handleData(content)
      }
  };

  const handleFileChosen = (file) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
  };

  return <div className='upload-expense'>
      <div className="input" onClick={() => {
        document.getElementById('file').click()
      }}>
        <i className="fas fa-folder-open"></i>
      </div>
      <input type='file'
             id='file'
             className='input-file'
             accept='.txt'
             onChange={e => handleFileChosen(e.target.files[0])}
      />
  </div>;
};