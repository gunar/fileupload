import React, {createRef} from 'react';
import {toast} from 'react-toastify';

import {validateFileType} from '../utils';
import {COLOR_BLUE, MAX_FILE_SIZE} from '../config';
import {uploadFile} from '../api';

const onFilePicked = refreshFiles => async event => {
  const file = event.target.files[0];
  if (file.size <= MAX_FILE_SIZE) {
    if (validateFileType(file.type)) {
      const formData = new FormData();
      for (const file of event.target.files) {
        formData.append('files', file, file.name);
      }
      try {
        await uploadFile(formData);
        toast.success(`File uploaded: "${file.name}"`);
        refreshFiles();
      } catch (e) {
        console.error(e);
        toast.error(`Failed to upload file: "${file.name}"`);
      }
    } else {
      event.target.value = '';
      toast.error('Invalid file type');
    }
  } else {
    event.target.value = '';
    toast.error('File too big');
  }
};

const UploadButton = props => {
  const fileInput = createRef();
  const onClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  return (
    <>
      <button onClick={onClick}>UPLOAD</button>
      <input
        ref={fileInput}
        type="file"
        encType="multipart/form-data"
        onChange={onFilePicked(props.refreshFiles)}
      />
      <style jsx>{`
        button {
          background-color: ${COLOR_BLUE};
          border: 0;
          color: white;
          font-size: large;
          padding: 0.5rem;
          width: 100%;
        }
        input[type='file'] {
          display: none;
        }
      `}</style>
    </>
  );
};

export default UploadButton;
