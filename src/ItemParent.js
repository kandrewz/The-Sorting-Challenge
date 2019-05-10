import "./index.css";
import React, { Component } from "react";
import Item from "./Item";
import axios from "axios";

class ItemParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTries: 0,
      sucTries: 0,
      currentItemNum: 12,
      itemNumTries: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }

  incNumTries(itemNum) {
    let array = this.state.itemNumTries;
    array[itemNum] += 1;
    this.setState({ numTries: this.state.numTries + 1 });
    this.setState({ itemNumTries: array });
    this.setState({ currentItemNum: itemNum });
  }

  incSucTries() {
    this.setState({ sucTries: this.state.sucTries + 1 });
    this.setState({ currentItemNum: 12 });
  }

  render() {
    const itemData = [
      ["recycling", "PlasticCup"],
      ["compost", "Burger"],
      ["landfill", "Pencil"],
      ["recycling", "ScratchPaper"],
      ["recycling", "SodaCan"],
      ["compost", "Pizza"],
      ["recycling", "Flyer"],
      ["landfill", "Styrofoam"],
      ["compost", "PopcornBox"],
      ["compost", "Napkin"],
      ["landfill", "RubberBand"],
      ["landfill", "ChipBag"]
    ];
    const items = itemData.map((v, i) => (
      <Item
        incNumTries={this.incNumTries.bind(this)}
        incSucTries={this.incSucTries.bind(this)}
        bin={v[0]}
        itemnumber={i}
        itemtype={v[1]}
      />
    ));
    let finishMessage;
    if (this.state.sucTries === 12) {
      /*let obj = {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      obj["numTries"] = this.state.numTries;
      for (let i = 0; i < 12; i++) {
        obj["itemNumTries" + i] = this.state.itemNumTries[i];
      } */
      console.log(this.state.numTries);
      /*axios
        .post(
          "http://localhost:5000/runs",
          JSON.stringify({
            numTries: this.state.numTries,
            itemNumTries0: this.state.itemNumTries[0],
            itemNumTries1: this.state.itemNumTries[1],
            itemNumTries2: this.state.itemNumTries[2],
            itemNumTries3: this.state.itemNumTries[3],
            itemNumTries4: this.state.itemNumTries[4],
            itemNumTries5: this.state.itemNumTries[5],
            itemNumTries6: this.state.itemNumTries[6],
            itemNumTries7: this.state.itemNumTries[7],
            itemNumTries8: this.state.itemNumTries[8],
            itemNumTries9: this.state.itemNumTries[9],
            itemNumTries10: this.state.itemNumTries[10],
            itemNumTries11: this.state.itemNumTries[11]
          })
        )
        .then(res => {
          console.log(res);
        });
      axios.get("http://localhost:5000/runs").then(function(response) {
        console.log("response: " + response);
      }); */
      fetch("http://localhost:5000/runs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "appplication/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          numTries: this.state.numTries,
          itemNumTries0: this.state.itemNumTries[0],
          itemNumTries1: this.state.itemNumTries[1],
          itemNumTries2: this.state.itemNumTries[2],
          itemNumTries3: this.state.itemNumTries[3],
          itemNumTries4: this.state.itemNumTries[4],
          itemNumTries5: this.state.itemNumTries[5],
          itemNumTries6: this.state.itemNumTries[6],
          itemNumTries7: this.state.itemNumTries[7],
          itemNumTries8: this.state.itemNumTries[8],
          itemNumTries9: this.state.itemNumTries[9],
          itemNumTries10: this.state.itemNumTries[10],
          itemNumTries11: this.state.itemNumTries[11]
        })
      });
      finishMessage = (
        <>
          <h1 className="score">
            Congrats! Here are some stats: database stuff here
          </h1>
          <h1 className="score">
            put their numTries and itemNumTries arr using map here
          </h1>
          <h1 className="score">Average Total Tries: </h1>
          <h1 className="score">Average Tries per Item: </h1>
        </>
      );
    }
    return (
      <div>
        <h1 className="score">Total Score: {this.state.sucTries} / 12</h1>
        <h1 className="score">Total Tries: {this.state.numTries}</h1>
        <h1 className="score">
          Tries for Current Item:{" "}
          {this.state.itemNumTries[this.state.currentItemNum]}
        </h1>
        {items}
        <div>{finishMessage}</div>
      </div>
    );
  }
}

export default ItemParent;
