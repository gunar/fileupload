import {toast} from 'react-toastify';

import {File} from '.'
import {deleteFile} from '../api';

const FileGrid = props => {
  const del = filename => async () => {
    try {
      await deleteFile(filename);
      props.refreshFiles();
      toast.success(`File deleted successfully: "${filename}"`);
    } catch (e) {
      toast.error(`Could not delete file: "${filename}"`);
    }
  };
  return (
    <div>
      {props.files.map(({name, size}, index) => (
        <File key={index} name={name} size={size} del={del} />
      ))}
      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-template-rows: repeat(1, 1fr);
          grid-column-gap: 10px;
          grid-row-gap: 10px;
        }
      `}</style>
    </div>
  );
};

export default FileGrid;
