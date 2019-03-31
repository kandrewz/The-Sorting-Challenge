import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Bin from './Bin';
import Item from './Item';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Item bin='recycling' itemtype='PlasticCup' itemnumber='0'/>, document.getElementById('item0'));
ReactDOM.render(<Item bin='compost' itemtype='Burger' itemnumber='1'/> , document.getElementById('item1'));
ReactDOM.render(<Item bin='landfill' itemtype='Pencil' itemnumber='2'/>, document.getElementById('item2'));
ReactDOM.render(<Item bin='recycling' itemtype='ScratchPaper'itemnumber='3'/>, document.getElementById('item3'));
ReactDOM.render(<Item bin='recycling' itemtype='SodaCan'itemnumber='4'/> , document.getElementById('item4'));
ReactDOM.render(<Item bin='compost' itemtype='Pizza'itemnumber='5'/>, document.getElementById('item5'));
ReactDOM.render(<Item bin='recycling' itemtype='Flyer' itemnumber='6'/>, document.getElementById('item6'));
ReactDOM.render(<Item bin='landfill' itemtype='Styrofoam'itemnumber='7'/>, document.getElementById('item7'));
ReactDOM.render(<Item bin='compost' itemtype='PopcornBox'itemnumber='8'/> , document.getElementById('item8'));
ReactDOM.render(<Item bin='compost' itemtype='Napkin'itemnumber='9'/>, document.getElementById('item9'));
ReactDOM.render(<Item bin='landfill' itemtype='RubberBand'itemnumber='10'/>, document.getElementById('item10'));
ReactDOM.render(<Item bin='landfill' itemtype='Floss'itemnumber='11'/> , document.getElementById('item11'));
ReactDOM.render(<Item bin='compost' itemtype='Flower'itemnumber='12'/>, document.getElementById('item12'));
//ReactDOM.render(<Item bin='recycling' itemtype='Newspaper'itemnumber='13'/>, document.getElementById('item13'));
//ReactDOM.render(<Bin />, document.getElementById('bin1'));
//ReactDOM.render(<Bin />, document.getElementById('bin2'));
//ReactDOM.render(<Bin />, document.getElementById('bin3'));
// If you want your app to work offline and load fastfer, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
