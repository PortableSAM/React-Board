import React from "react";

const firebase = require("firebase/app");
require("firebase/firestore");

function onDel(props) {
  console.log(props);
  const delId = props.brd.id;
  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("Post")
      .doc(delId)
      .delete();
  };
  return (
    <div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
export default onDel;
