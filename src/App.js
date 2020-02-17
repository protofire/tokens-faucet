import React, { useEffect, useState } from "react";
import "./App.css";
import { useWeb3Context } from "web3-react";
import BN from "big.js";
import { ethers } from "ethers";
import { networks } from "./networks";

function App() {
  const context = useWeb3Context();
  const {
    connectorName,
    account,
    networkId,
    library,
    setFirstValidConnector,
    error
  } = context;

  let contract = null;

  const [token, setToken] = useState("DAI");

  useEffect(() => {
    setFirstValidConnector(["MetaMask"]);
  }, []);

  useEffect(() => {
    if (account && library) {
      const { address, abi } = networks[token][networkId];
      contract = new ethers.Contract(address, abi, library.getSigner());
    }
  }, [account, library, networkId, token]);

  if (
    error &&
    (error.code === "UNSUPPORTED_NETWORK" ||
      error.code === "ALL_CONNECTORS_INVALID")
  ) {
    return <div className="App">Connect MetaMask to Rinkeby</div>;
  }

  const getToken = async () => {
    const amount = new BN(10).pow(18);
    const method = networks[token][networkId].abi[0].includes("mint")
      ? contract.mint
      : contract.allocateTo;
    await method(account, amount.toString());
  };

  return (
    <div className="App">
      <p>Active Connector: {connectorName}</p>
      <p>Account: {account || "None"}</p>
      <p>Network ID: {networkId}</p>
      <select
        onChange={e => {
          setToken(e.target.value);
        }}
        value={token}
      >
        <option value="DAI">DAI</option>
        <option value="BAT">BAT</option>
      </select>

      <button onClick={getToken}> {`GET ${token.toUpperCase()}`} </button>
    </div>
  );
}

export default App;
