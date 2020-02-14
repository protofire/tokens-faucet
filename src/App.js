import React, { useEffect } from "react";
import "./App.css";
import { useWeb3Context } from "web3-react";

function App() {
  const {
    connectorName,
    account,
    networkId,
    setFirstValidConnector
  } = useWeb3Context();

  useEffect(() => {
    setFirstValidConnector(["MetaMask"]);
  }, []);

  return (
    <div className="App">
      <p>Active Connector: {connectorName}</p>
      <p>Account: {account || "None"}</p>
      <p>Network ID: {networkId}</p>
    </div>
  );
}

export default App;
