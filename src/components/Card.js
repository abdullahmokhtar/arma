import React from "react";
import joinus from "./joinus.png";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes["heading-image"]}>
        <img src={joinus} alt="join us" loading="lazy" />
      </div>
      <h1>Employment Application</h1>
      <p>
        Fill the form below accurately indicating your potentials and
        suitability to job applying for.
      </p>
      <hr />
      
      {props.children}
    </div>
  );
}

export default Card;
