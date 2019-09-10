const CurrentQuery = props => {
  if (!!props.query) {
    return (
      <p>
        Showing results for: <span className="query">{props.query}</span>
        <style jsx>{`
          span {
            background-color: #ff0;
            padding: 0.2rem;
          }
        `}</style>
      </p>
    );
  } else {
    return <p>Displaying all files.</p>;
  }
};

export default CurrentQuery;
