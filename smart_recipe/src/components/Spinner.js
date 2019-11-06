import React from "react";

const Spinner = props => {
  return (
    <div className="ui active dimmer">
      {/* <div className="ui big text loader">{props.message}</div> */}
      <div className="ui big text" style={{ color: "white", fontSize: 30 }}>
        {props.message}
      </div>
      <br />
      <img
        src="https://i.gifer.com/p7A.gif"
        alt="spinner"
        style={{
          width: 300,
          height: 300,
          borderRadius: 300 / 2
        }}
      />
    </div>
  );
};

Spinner.defaultProps = {
  message: "Loading..."
};

export default Spinner;
