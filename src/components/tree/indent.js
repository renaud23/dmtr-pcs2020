function Indent({ index }) {
  if (index) {
    return new Array(index).fill(null).map(function (_, i) {
      return <span className="indent" key={i}></span>;
    });
  }

  return null;
}

export default Indent;
