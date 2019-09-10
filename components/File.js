import {humanFileSize} from '../utils';
import {COLOR_BLUE} from '../config';

const File = props => (
  <>
    <div>
      <h2>
        <a data-ci={`file-${props.name}`} href={`/${props.name}`}>
          {props.name}
        </a>
      </h2>
      <p>{humanFileSize(props.size)}</p>
      <button data-ci={`delete-${props.name}`} onClick={props.del(props.name)}>
        delete
      </button>
    </div>
    <style jsx>{`
      a,
      a:hover,
      a:focus,
      a:visited {
        color: black;
        text-decoration: none;
      }
      div {
        border: 1px solid black;
        padding: 1rem;
        overflow-wrap: break-word;
        position: relative;
      }
      button {
        background-color: ${COLOR_BLUE};
        border: 0;
        color: white;
        padding: 0.5rem;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
      }
    `}</style>
  </>
);

export default File;
