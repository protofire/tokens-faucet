import React, { useState } from "react";
import { useWeb3Context } from "web3-react";
import BN from "big.js";
import { ethers } from "ethers";
import { abis } from "./../constants";

function GetCustomToken() {
  const context = useWeb3Context();
  const { account, library } = context;

  const [customAddress, setCustomAddress] = useState("");
  const [mining, setMining] = useState(false);

  async function supportMethod(contract, name, params) {
    try {
      await contract.estimate[name](...params);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const getCustomToken = async () => {
    const { mint1, mint2, allocateTo } = abis;
    const qtyWei = new BN(10)
      .pow(18)
      .mul(100)
      .toString();

    const contractSupported = (
      await Promise.all(
        [
          { abi: mint1, params: [qtyWei], name: "mint" },
          { abi: mint2, params: [account, qtyWei], name: "mint" },
          { abi: allocateTo, params: [account, qtyWei], name: "allocateTo" }
        ].map(async o => {
          const contractTx = new ethers.Contract(
            customAddress,
            o.abi,
            library.getSigner()
          );

          const supported = await supportMethod(contractTx, o.name, o.params);
          console.log(`${o.name} supported? ${supported}`);
          return { methodTx: contractTx[o.name], supported, params: o.params };
        })
      )
    ).find(o => o.supported);

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
    <div>
      <input
        type="text"
        placeholder="Use custom address"
        onChange={e => setCustomAddress(e.target.value)}
        disabled={mining}
        value={customAddress}
      ></input>
      <button onClick={getCustomToken} disabled={mining}>
        Get 100 custom token
      </button>
    </div>
  );
}

export default GetCustomToken;
