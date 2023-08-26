import React from "react";

const ActionsButton = (props) => {
  return (
    <div className="col-md-12">
      <div className="text-center mt-5">
        <button
          type="button"
          className="btn bg-info me-5"
          onClick={props.Previous}
        >
          Back
        </button>
        <button
          type="button"
          className="btn bg-info"
          disabled={!props.stepIsValid}
          onClick={props.Continue}
        >
          {props.submit ? "submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default ActionsButton;
