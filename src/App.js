import React, { useEffect } from "react";
import "./App.css";
import { useWeb3Context } from "web3-react";
import BN from "big.js";
import { ethers } from "ethers";

function App() {
  const {
    connectorName,
    account,
    networkId,
    library,
    setFirstValidConnector
  } = useWeb3Context();

  const address = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";
  const abi = ["function allocateTo(address to, uint amount)"];
  let contract = null;

  useEffect(() => {
    setFirstValidConnector(["MetaMask"]);
  }, []);

  useEffect(() => {
    if (account && library) {
      contract = new ethers.Contract(address, abi, library.getSigner());
    }
  }, [account, library]);

  const getDAI = async () => {
    const amount = new BN(10).pow(18);
    await contract.allocateTo(account, amount.toString());
  };

  return (
    <div className="App">
      <p>Active Connector: {connectorName}</p>
      <p>Account: {account || "None"}</p>
      <p>Network ID: {networkId}</p>
      <button onClick={getDAI}>GET DAI</button>
    </div>
  );
}

export default App;
