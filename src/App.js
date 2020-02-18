import React, { useEffect, useState } from "react";
import "./App.css";
import { useWeb3Context } from "web3-react";
import BN from "big.js";
import { ethers } from "ethers";
import { tokens, networks } from "./constants";

function App() {
  const context = useWeb3Context();
  const {
    account,
    networkId,
    library,
    setFirstValidConnector,
    error
  } = context;

  const [token, setToken] = useState("DAI");
  const [amount, setAmount] = useState(0);
  const [mining, setMining] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    setFirstValidConnector(["MetaMask"]);
  }, []);

  useEffect(() => {
    if (account && library) {
      const { address, abi } = tokens[token][networkId];
      setContract(new ethers.Contract(address, abi, library.getSigner()));
    }
  }, [account, library, networkId, token]);

  useEffect(() => {
    if (networkId) {
      setAmount(tokens[token][networkId].defaultAmount);
    }
  }, [networkId, token]);

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

  const getToken = async () => {
    const qtyWei = new BN(10).pow(18).mul(amount);
    const method = tokens[token][networkId].abi[0].includes("mint")
      ? contract.mint
      : contract.allocateTo;
    const tx = await method(account, qtyWei.toString());
    setMining(true);
    await tx.wait();
    setMining(false);
  };

  return (
    <>
      <div className="App">
        <p>Account: {account || "None"}</p>
        <p>Network: {networkName} </p>
        <div>
          <select
            onChange={e => {
              setToken(e.target.value);
            }}
            value={token}
          >
            <option value="DAI">DAI</option>
            <option value="BAT">BAT</option>
          </select>
        </div>

        <button onClick={getToken} disabled={!amount || mining}>
          {`GET ${amount} ${token.toUpperCase()}`}{" "}
        </button>
        <div>
          <a
            target="_blank"
            href={`https://${networkName.toLowerCase()}.etherscan.io/address/${
              tokens[token][networkId].address
            }`}
          >
            {tokens[token][networkId].address}
          </a>
        </div>
      </div>
      <footer>
        <a href="https://github.com/protofire/tokens-faucet">Source</a>
      </footer>
    </>
  );
}

export default App;
