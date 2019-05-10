import React, { Component } from "react";
import Draggable from "react-draggable";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0
      },
      overlapsBin: false
    };
  }

  changeBinColor(binID, color) {
    document.getElementById(binID).style.borderColor = color;
  }
  setOverlapsBin() {
    this.setState({ overlapsBin: true });
  }

  overlapsAnyBin() {
    let itemnumber = `item${this.props.itemnumber}`;
    let itemRect = document.getElementById(itemnumber).getBoundingClientRect();
    let compostRect = document
      .getElementById("compostbin")
      .getBoundingClientRect();
    if (
      itemRect.right > compostRect.left &&
      itemRect.top < compostRect.bottom &&
      itemRect.bottom > compostRect.top &&
      itemRect.left < compostRect.right
    ) {
      return true;
    }
    let recyclingRect = document
      .getElementById("recyclingbin")
      .getBoundingClientRect();
    if (
      itemRect.right > recyclingRect.left &&
      itemRect.top < recyclingRect.bottom &&
      itemRect.bottom > recyclingRect.top &&
      itemRect.left < recyclingRect.right
    ) {
      return true;
    }
    let landfillRect = document
      .getElementById("landfillbin")
      .getBoundingClientRect();
    if (
      itemRect.right > landfillRect.left &&
      itemRect.top < landfillRect.bottom &&
      itemRect.bottom > landfillRect.top &&
      itemRect.left < landfillRect.right
    ) {
      return true;
    }

    return false;
  }
  handleStop = (e, data) => {
    if (this.overlapsAnyBin()) {
      this.props.incNumTries(this.props.itemnumber);
      let bin = `${this.props.bin}bin`;
      let itemnumber = `item${this.props.itemnumber}`;
      let itemRect = document
        .getElementById(itemnumber)
        .getBoundingClientRect();
      let binRect = document.getElementById(bin).getBoundingClientRect();
      if (
        itemRect.right > binRect.left &&
        itemRect.top < binRect.bottom &&
        itemRect.bottom > binRect.top &&
        itemRect.left < binRect.right
      ) {
        this.props.incSucTries();
        if (this.props.bin === "recycling") {
          this.changeBinColor("recyclingbin", "green");
          this.changeBinColor("compostbin", "transparent");
          this.changeBinColor("landfillbin", "transparent");
        } else if (this.props.bin === "compost") {
          this.changeBinColor("compostbin", "green");
          this.changeBinColor("recyclingbin", "transparent");
          this.changeBinColor("landfillbin", "transparent");
        } else if (this.props.bin === "landfill") {
          this.changeBinColor("landfillbin", "green");
          this.changeBinColor("compostbin", "transparent");
          this.changeBinColor("recyclingbin", "transparent");
        }
        this.setOverlapsBin();
      } else {
        this.changeBinColor("landfillbin", "red");
        this.changeBinColor("compostbin", "red");
        this.changeBinColor("recyclingbin", "red");
      }
    }
    /*console.log("x: " + data.x);
console.log("y: " + data.y); */
  };
  handleDrag = (e, data) => {
    const { x, y } = data;
    this.setState({
      position: { x: x, y: y }
    });
    this.changeBinColor("landfillbin", "transparent");
    this.changeBinColor("compostbin", "transparent");
    this.changeBinColor("recyclingbin", "transparent");
  };

  getImage = () => {
    // let x = this.props.itemtype;
    return require(`./itemimages/${this.props.itemtype}.png`);
  };

  render() {
    let image = this.getImage();
    let item;
    if (this.state.overlapsBin === false) {
      item = (
        <Draggable
          axis="both"
          handle=".item"
          defaultPosition={null}
          position={this.state.position}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          <div className="item" id={`item${this.props.itemnumber}`}>
            <p>{this.props.itemtype}</p>
            <img
              className="pic"
              draggable="false"
              src={image}
              alt={this.props.itemtype}
            />
          </div>
        </Draggable>
      );
    }
    return <div>{item}</div>;
  }
}
export default Item;
