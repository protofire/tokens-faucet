import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Web3Provider from "web3-react";
import { Connectors } from "web3-react";
const { InjectedConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [4, 42] });
const connectors = { MetaMask };

ReactDOM.render(
  <Web3Provider libraryName="ethers.js" connectors={connectors}>
    <App />
  </Web3Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
