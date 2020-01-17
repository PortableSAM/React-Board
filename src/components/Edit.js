import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const firebase = require("firebase/app");
require("firebase/firestore");

function Edit(props) {
  const brdId = props.match.params.id;
  console.log(brdId);
  const [brdPost, setBrdPost] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editText, setEditText] = useState("");

  const postTime = firebase.firestore.FieldValue.serverTimestamp();

  const editPost = {
    Title: editTitle,
    Author: editAuthor,
    Text: editText,
    CreateAt: postTime
  };

  const handleChange = event => {
    event.preventDefault();
    const db = firebase.firestore();
    db.collection("Post")
      .doc(brdId)
      .update(editPost)
      .then(() => {
        console.log("업데이트 완료");
        alert("수정 완료");
        window.location.assign("/");
      })
      .catch(error => {
        console.log("업데이트 실패", error);
        alert("업데이트 실패");
      });
  };

  useEffect(() => {
    const fetchData = () => {
      const db = firebase.firestore();
      const data = db.collection("Post").doc(brdId);
      data
        .get()
        .then(doc => {
          if (doc.exists) {
            const post = { id: doc.id, ...doc.data() };
            setBrdPost(post);
          } else {
            console.log("No such document!");
            alert("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    };
    return fetchData();
  }, [brdId]);
  console.log(editTitle);
  return (
    <div>
      <div className="edit-title">
        <label>Title : </label>
        <input
          type="text"
          defaultValue={brdPost.Title}
          onChange={event => setEditTitle(event.target.value)}
        />
      </div>
      <div className="edit-auth">
        <label>Author : </label>
        <input
          type="text"
          defaultValue={brdPost.Author}
          onChange={event => setEditAuthor(event.target.value)}
        />
      </div>
      <div className="edit-text">
        <input
          type="textarea"
          defaultValue={brdPost.Text}
          onChange={event => setEditText(event.target.value)}
        />
      </div>
      <Link to="/">
        <button>Cancel</button>
      </Link>
      <input type="submit" onClick={handleChange} />
    </div>
  );
}

export default Edit;
