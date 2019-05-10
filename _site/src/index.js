import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ItemParent from "./ItemParent";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<ItemParent />, document.getElementById("item-container"));

serviceWorker.unregister();
