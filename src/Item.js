import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable';
import PlasticCup from './itemimages/PlasticCup.jpg';
import Burger from './itemimages/Burger.jpg';
import Pencil from './itemimages/Pencil.jpg';
import ScratchPaper from './itemimages/ScratchPaper.jpg';
import Flyer from './itemimages/Flyer.jpg';
import SodaCan from './itemimages/SodaCan.jpg';
import Pizza from './itemimages/Pizza.jpg';
import Napkin from './itemimages/Napkin.jpg';
import PopcornBox from './itemimages/PopcornBox.jpg';
import RubberBand from './itemimages/RubberBand.jpg';
import Styrofoam from './itemimages/Styrofoam.jpg';
import Floss from './itemimages/Floss.jpg';
import Newspaper from './itemimages/Newspaper.jpg';
import Flower from './itemimages/Flower.jpg';

class Item extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            position: {
                x: 0, y: 0
            }, 
            numTries: 0,
            sucTries: 0,
        };
    }
    changeBinGreen(binID) {
      document.getElementById(binID).style.borderColor = 'green';
    }
    changeBinRed(binID) {
      document.getElementById(binID).style.borderColor = 'red';
    }
    changeBinWhite(binID) {
      document.getElementById(binID).style.borderColor = 'white';
    }

    handleStop = (e, data) => {
      const prevTries = this.state.numTries;
      const newState = {
        numTries: prevTries + 1
     };
      this.setState(newState);
      let down, left, up, right = 0;
          if (this.props.bin === 'recycling')
            {
              down = 70; left = 21-108*this.props.itemnumber; up = 525; right = 344-108*this.props.itemnumber;
            }
            else if (this.props.bin === 'compost')
            {
              down = 70; left = 490-108*this.props.itemnumber; up = 525; right = 823-108*this.props.itemnumber;
            }
            else if (this.props.bin === 'landfill')
            {
              down = 70; left = 971-108*this.props.itemnumber; up = 525; right = 1295-108*this.props.itemnumber;
            }
        if (data.x > left && data.y > down && data.y < up && data.x < right) {

           this.setState({
               position: {x: -999, y: -999},
           });
          const prevTries = this.state.sucTries;
              const newState = {
              sucTries: prevTries + 1
           };
           this.setState(newState);
           if (this.props.bin === 'recycling')
           {
             this.changeBinGreen('recyclingbin');
             this.changeBinWhite('compostbin');
             this.changeBinWhite('landfillbin');
           }
           else if (this.props.bin === 'compost')
           {
             this.changeBinGreen('compostbin');
             this.changeBinWhite('recyclingbin');
             this.changeBinWhite('landfillbin');
           }
           else if (this.props.bin === 'landfill')
           {
             this.changeBinGreen('landfillbin');
             this.changeBinWhite('compostbin');
             this.changeBinWhite('recyclingbin');
           }
        }
        else 
        {
           if (this.props.bin === 'recycling')
           {
             this.changeBinRed('recyclingbin');
             this.changeBinRed('compostbin');
             this.changeBinRed('landfillbin');
           }
           else if (this.props.bin === 'compost')
           {
             this.changeBinRed('compostbin');
             this.changeBinRed('recyclingbin');
             this.changeBinRed('landfillbin');
           }
           else if (this.props.bin === 'landfill')
           {
             this.changeBinRed('landfillbin');
             this.changeBinRed('compostbin');
             this.changeBinRed('recyclingbin');
           }
        }
        console.log("x: " + data.x);
        console.log("y: " + data.y);
    }
    handleDrag = (e, data) => {
        const {x, y} = data;
        this.setState({
            position: {x:x, y:y}
        });
        this.changeBinWhite('landfillbin');
        this.changeBinWhite('compostbin');
        this.changeBinWhite('recyclingbin');
    }
    eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data', data);
    }
    getImage = () => {
      let x = this.props.itemtype;
      if (x === 'PlasticCup')
        return PlasticCup;
      else if (x === 'Burger')
        return Burger;
      else if (x === 'Pencil')
        return Pencil;
      else if (x === 'ScratchPaper')
        return ScratchPaper;
      else if (x === 'Flyer')
        return Flyer;
      else if (x === 'SodaCan')
        return SodaCan;
      else if (x === 'Pizza')
        return Pizza;
      else if (x === 'PopcornBox')
        return PopcornBox;
      else if (x === 'Napkin')
        return Napkin;
      else if (x === 'RubberBand')
        return RubberBand;
      else if (x === 'Styrofoam')
        return Styrofoam;
      else if (x === 'Flower')
        return Flower;
      else if (x === 'Newspaper')
        return Newspaper;
      else if (x === 'Floss')
        return Floss;
    }
  render() {
    let image = this.getImage();
    
    return (
        <Draggable
        axis = "both"
        handle = ".item"
        defaultPosition={null}
        position={this.state.position}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div className = "item">
            <p>{this.props.itemtype}</p>
            <img id="layout" draggable="false" src={image} alt=""/>
        </div>
        </Draggable>
    );
  }
}
export default Item;
