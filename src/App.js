import React, { useState } from 'react';
import { database } from "./firebaseConfig";
import './App.css';

function App() {

  const [newName1, setNewName1] = useState('');
  const [newName2, setNewName2] = useState('');
  const [result, setResult] = useState('');


  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  function checkNames() {
    if (newName1 === "" || newName2 === "") {
      alert("Please fill names");
      return;
    }
    let name1 = newName1.toLowerCase();
    let name2 = newName2.toLowerCase();
    let flames = ['Friend', 'Love', 'Affection', 'Marriage', 'Enemy', 'Sister'];

    let removedCharacters = [];

    name1 = replaceAll(name1, " ", "");
    name2 = replaceAll(name2, " ", "");

    for (let i = 0; i < name2.length; i++) {
      let char = name2.charAt(i);
      if (name1.indexOf(char) > -1) {
        name1 = name1.replace(name2.charAt(i), '')
        removedCharacters.push(name2.charAt(i))
      }
    }

    for (let i = 0; i < removedCharacters.length; i++) {
      name2 = name2.replace(removedCharacters[i], '')
    }

    let flameName = name1 + name2;
    let nameLength = flameName.length;
    let lastRemovedIndex = 0;

    while (true) {
      let totalLength = nameLength + lastRemovedIndex;

      if (flames.length >= totalLength) {
        lastRemovedIndex = totalLength - 1;
        flames.splice((totalLength - 1), 1);
      } else {
        let modValue = totalLength % flames.length;
        lastRemovedIndex = modValue - 1;
        flames.splice((modValue - 1), 1);
      }
      if (lastRemovedIndex === flames.length) {
        lastRemovedIndex = 0;
      }

      if (flames.length === 1) {
        break;
      }
    }
    setResult(flames[0]);
    database.ref('users/' + newName1).set({
      name1: newName1,
      name2: newName2,
      result : flames[0]
    })
  }

  function onChangeName1(e) {
    setNewName1(e.target.value)
  }

  function onChangeName2(e) {
    setNewName2(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="width-ctrl">
          <h1>Flames</h1>
          <label>Name 1:</label><input className="input1" value={newName1} onChange={(e) => {
            onChangeName1(e)
          }} /><br />
          <label>Name 2:</label>
          <input className="input2" value={newName2} onChange={(e) => {
            onChangeName2(e)
          }} /><br />
          <div className="btn-center">
            <button className="button-sub" onClick={checkNames}>Find Relation</button>
          </div><br />
          {
            result
          }
        </div>
      </header>
    </div>
  );
}

export default App;
