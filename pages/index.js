import debounce from 'p-debounce';
import Head from 'next/head';
import React, {useState, useEffect, useCallback} from 'react';
import {toast} from 'react-toastify';

import {CurrentQuery, UploadButton, FileGrid, SearchBar} from '../components';
import {humanFileSize} from '../utils';
import {listFiles} from '../api';

const Home = props => {
  // initial props.files come from Server-Side Rendering (SSR)
  const [files, setFiles] = useState(props.files);
  const [query, setQuery] = useState('');

  // debounce queries to the API
  const searchFor = useCallback(
    debounce(async query => setFiles((await listFiles(query)).files), 200),
    [],
  );

  // when query changes, refresh list of files
  useEffect(() => {
    searchFor(query);
  }, [query]);

  // function to manually trigger refreshing the list of files
  const refreshFiles = () => {
    searchFor(query);
  };

  const totalSize = humanFileSize(
    files.reduce((sum, next) => sum + next.size, 0),
  );

  return (
    <div>
      <Head>
        <title>File Upload</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link
          href="/static/ReactToastify.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <UploadButton refreshFiles={refreshFiles} />
      <SearchBar query={query} setQuery={setQuery} />
      <CurrentQuery query={query} />
      <h1>
        {files.length} document{files.length !== 1 && 's'}
      </h1>
      <p className="total">Total size: {totalSize}</p>
      <FileGrid files={files} refreshFiles={refreshFiles} />
      <style global jsx>{`
        body {
          max-width: 960px;
          margin: 0 auto;
        }
        h1 {
          margin-bottom: 0;
        }
        p.total {
          text-align: right;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async () => listFiles();

toast.configure();

export default Home;
