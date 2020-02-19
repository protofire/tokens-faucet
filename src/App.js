import React, { useEffect } from "react";
import "./App.css";
import { useWeb3Context } from "web3-react";
import { networks } from "./constants";
import GetCustomToken from "./components/GetCustomToken";
import GetToken from "./components/GetToken";

function App() {
  const context = useWeb3Context();
  const { account, networkId, setFirstValidConnector, error } = context;

  useEffect(() => {
    setFirstValidConnector(["MetaMask"]);
  }, []);

  if (
    error &&
    (error.code === "UNSUPPORTED_NETWORK" ||
      error.code === "ALL_CONNECTORS_INVALID")
  ) {
    return <div className="App">Connect MetaMask to Rinkeby</div>;
  }

  if (!networkId) {
    return null;
  }

  const networkName = networks[networkId].name;
  return (
    <>
      <div className="App">
        <p>Account: {account || "None"}</p>
        <p>Network: {networkName} </p>
        <GetToken />
        <GetCustomToken />
      </div>
      <footer>
        <a href="https://github.com/protofire/tokens-faucet">Source</a>
      </footer>
    </>
  );
}

export default App;
