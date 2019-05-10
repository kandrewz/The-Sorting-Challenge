import "./index.css";
import React, { Component } from "react";
import Item from "./Item";

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
      finishMessage = (
        <>
          <h1 className="score">
            Congrats! Here are some stats: database stuff here
          </h1>
          <h1 className="score">Average Total Tries:</h1>
          <h1 className="score">Average Tries per Item:</h1>
        </>
      );
      console.log("congrats!");
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
