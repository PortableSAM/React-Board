import React, { useState } from "react";
import { Link } from "react-router-dom";
//import BoardApp from "./BoardApp";

const firebase = require("firebase/app");
require("firebase/firestore");

function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const postTime = firebase.firestore.Timestamp.fromDate(new Date());
  const Post = {
    Title: title,
    Author: author,
    Text: text,
    CreateAt: postTime
  };
  const PostLegnth = (title.length, author.length, text.length) === 0;

  console.log(title.length);

  const onCreate = event => {
    event.preventDefault();
    if (PostLegnth) {
      console.log("error");
      alert("전송 실패");
    } else {
      const db = firebase.firestore();
      db.collection("Post").add(Post);
      alert("글 전송 완료");
      window.location.assign("/");
    }
  };

  return (
    <div>
      <h2>Post Create</h2>
      <div className="create-container">
        <label>Title</label>
        <input
          type="text"
          defaultValue={setTitle}
          placeholder="Title"
          id="post-title"
          onChange={event => setTitle(event.target.value)}
        />
        <label>Author</label>
        <input
          type="text"
          placeholder="Author"
          defaultValue={setAuthor}
          id="post-author"
          onChange={event => setAuthor(event.target.value)}
        />
        <input
          type="textarea"
          defaultValue={setText}
          id="post-author"
          onChange={event => setText(event.target.value)}
        />
      </div>
      <Link to="/">
        <button>Board List</button>
      </Link>
      <button type="submit" onClick={onCreate}>
        Submit
      </button>
    </div>
  );
}

export default Create;
