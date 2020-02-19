import React, { useEffect, useState } from "react";
import "./App.css";
import { useWeb3Context } from "web3-react";
import BN from "big.js";
import { ethers } from "ethers";
import { tokens, networks, abis } from "./constants";

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
  const [customAddress, setCustomAddress] = useState("");

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

  async function supportMethod(contractMethod, params) {
    try {
      console.log(contractMethod);
      console.log(params);
      await contractMethod(...params);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const getCustomToken = async () => {
    const { mint1, mint2, allocateTo1 } = abis;
    console.log("CUSTOM", customAddress);
    const qtyWei = new BN(10)
      .pow(18)
      .mul(100)
      .toString();

    const contractSupported = [
      { method: mint1, params: [account, qtyWei], name: "mint" },
      { method: mint2, params: [qtyWei], name: "mint" },
      { method: allocateTo1, params: [account, qtyWei], name: "allocateTo" }
    ]
      .map(o => {
        return {
          original: o.method,
          view: [`${o.method[0]} view`],
          params: o.params,
          name: o.name
        };
      })
      .map(o => {
        console.log(o.view);
        console.log(o.original);
        const contractView = new ethers.Contract(
          customAddress,
          o.view,
          library.getSigner()
        );
        const contractTx = new ethers.Contract(
          customAddress,
          o.original,
          library.getSigner()
        );
        return {
          methodView: contractView[o.name],
          methodTx: contractTx[o.name],
          params: o.params
        };
      })
      .map(async c => {
        const supported = await supportMethod(c.methodView, c.params);
        return { methodTx: c.methodTx, supported };
      })
      .find(o => o.supported);

    if (contractSupported) {
      const tx = await contractSupported.methodTx(...contractSupported.params);
      setMining(true);
      await tx.wait();
      setMining(false);
    } else {
      console.error("Unsupported token");
    }
  };

  return (
    <>
      <div className="App">
        <p>Account: {account || "None"}</p>
        <p>Network: {networkName} </p>
        <input
          type="text"
          placeholder="Use custom address"
          onChange={e => setCustomAddress(e.target.value)}
          disabled={mining}
          value={customAddress}
        ></input>
        {!customAddress ? (
          <div>
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
          </div>
        ) : (
          <button onClick={getCustomToken} disabled={mining}>
            Get 100 custom token
          </button>
        )}
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
