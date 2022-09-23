function Toggle({ expended, toggle }) {
  const what = expended ? "-" : "+";
  return (
    <span className="toggle" onClick={toggle}>
      {`[${what}]`}
    </span>
  );
}

export default Toggle;
