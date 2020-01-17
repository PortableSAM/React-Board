import React, { useState, useEffect } from "react";
import fire_Config from "./fireConfig/config";
import { Link } from "react-router-dom";
import Del from "./Del";

const firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp(fire_Config);

function BoardApp() {
  const [brdItem, setBrdItem] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const db = firebase.firestore();
      //fireStore 실시간 리스너
      db.collection("Post")
        .orderBy("CreateAt", "desc")
        .onSnapshot(snapshot => {
          const resData = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          //snapshot 데이터 넘김 (to setBrdItem)
          setBrdItem(resData);
        });
    };
    return fetchData();
  }, []);

  console.log(brdItem);
  return (
    <div className="container">
      <div className="table-title">
        <h2>Hello React FireStore</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>Desc</th>
            <th>Author</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {brdItem.map(brd => (
            <tr key={brd.id}>
              <td>{brd.Title}</td>
              <td>{brd.Text}</td>
              <td>{brd.Author}</td>
              <td>
                {new Date(brd.CreateAt.seconds * 1000).toLocaleDateString("ko")}
              </td>
              <td>
                <Del brd={brd} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/create">
        <button>Add Post</button>
      </Link>
    </div>
  );
}

export default BoardApp;
