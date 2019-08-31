import React, { Component } from "react";
import GameBoard from "./GameBoard";
import "../index.css";

class App extends Component {
  render() {
    return (
      <>
        <div style={styles} className="ui  container">
          <GameBoard />
        </div>
      </>
    );
  }
}

const styles = { fontFamily: "Chilanka" };
export default App;
