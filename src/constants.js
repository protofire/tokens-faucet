export const tokens = {
  DAI: {
    "4": {
      address: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
      abi: ["function allocateTo(address to, uint amount)"],
      defaultAmount: 100
    },
    "42": {
      address: "0x29200B8486Ec4f3A13E11f03FB0017C15a99C435",
      abi: ["function mint(address to, uint amount)"],
      defaultAmount: 5
    }
  },
  BAT: {
    "4": {
      address: "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99",
      abi: ["function allocateTo(address to, uint amount)"],
      defaultAmount: 100
    },
    "42": {
      address: "0x9dDB308C14f700d397bB26F584Ac2E303cdc7365",
      abi: ["function allocateTo(address to, uint amount)"],
      defaultAmount: 100
    }
  }
};

export const networks = {
  "4": {
    name: "Rinkeby"
  },
  "42": {
    name: "Kovan"
  }
};

export const supportedNetworks = Object.keys(networks).map(Number);
