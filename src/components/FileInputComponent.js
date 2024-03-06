import React from 'react';

const FileInputComponent = ({ inputName, handleFileChange, onRemove }) => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        style={{ marginTop: 15 }}
        type="file"
        name={inputName}
        className="form-control file"
        accept=".pdf"
        required
        multiple
        onChange={(e) => handleFileChange(inputName, e)}
      />
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            position: 'absolute',
            top: 5,
            right: 0,
            zIndex: 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span role="img" aria-label="cross icon" style={{ fontSize: '1em' }}>
            ❌
          </span>
        </button>
       )} 
    </div>
  );
};

export default FileInputComponent;
