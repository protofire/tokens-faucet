(this["webpackJsonptokens-faucet"]=this["webpackJsonptokens-faucet"]||[]).push([[0],{213:function(e,t,n){e.exports=n(573)},218:function(e,t,n){},220:function(e,t,n){},295:function(e,t){},297:function(e,t){},317:function(e,t){},319:function(e,t){},548:function(e,t){},573:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n.n(a),c=n(210),r=n.n(c),u=(n(218),n(57)),s=n.n(u),i=n(211),l=n(58),d=(n(220),n(42)),f=n.n(d),m=n(212),b=n.n(m),p=n(37),E={DAI:{4:{address:"0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",abi:["function allocateTo(address to, uint amount)"],defaultAmount:100},42:{address:"0x29200B8486Ec4f3A13E11f03FB0017C15a99C435",abi:["function mint(address to, uint amount)"],defaultAmount:5}},BAT:{4:{address:"0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99",abi:["function allocateTo(address to, uint amount)"],defaultAmount:100},42:{address:"0x9dDB308C14f700d397bB26F584Ac2E303cdc7365",abi:["function allocateTo(address to, uint amount)"],defaultAmount:100}}},v={4:{name:"Rinkeby"},42:{name:"Kovan"}},A=Object.keys(v).map(Number);var h=function(){var e=Object(d.useWeb3Context)(),t=e.account,n=e.networkId,c=e.library,r=e.setFirstValidConnector,u=e.error,f=Object(a.useState)("DAI"),m=Object(l.a)(f,2),A=m[0],h=m[1],k=Object(a.useState)(0),w=Object(l.a)(k,2),O=w[0],C=w[1],j=Object(a.useState)(!1),g=Object(l.a)(j,2),N=g[0],T=g[1],x=Object(a.useState)(null),y=Object(l.a)(x,2),B=y[0],I=y[1];if(Object(a.useEffect)((function(){r(["MetaMask"])}),[]),Object(a.useEffect)((function(){if(t&&c){var e=E[A][n],a=e.address,o=e.abi;I(new p.ethers.Contract(a,o,c.getSigner()))}}),[t,c,n,A]),Object(a.useEffect)((function(){n&&C(E[A][n].defaultAmount)}),[n,A]),u&&("UNSUPPORTED_NETWORK"===u.code||"ALL_CONNECTORS_INVALID"===u.code))return o.a.createElement("div",{className:"App"},"Connect MetaMask to Rinkeby");if(!n)return null;var S=v[n].name,D=function(){var e=Object(i.a)(s.a.mark((function e(){var a,o,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new b.a(10).pow(18).mul(O),o=E[A][n].abi[0].includes("mint")?B.mint:B.allocateTo,e.next=4,o(t,a.toString());case 4:return c=e.sent,T(!0),e.next=8,c.wait();case 8:T(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"App"},o.a.createElement("p",null,"Account: ",t||"None"),o.a.createElement("p",null,"Network: ",S," "),o.a.createElement("div",null,o.a.createElement("input",{value:O,onChange:function(e){C(e.target.value)},type:"number"}),o.a.createElement("select",{onChange:function(e){h(e.target.value)},value:A},o.a.createElement("option",{value:"DAI"},"DAI"),o.a.createElement("option",{value:"BAT"},"BAT"))),o.a.createElement("button",{onClick:D,disabled:!O||N},"GET ".concat(O," ").concat(A.toUpperCase())," "),o.a.createElement("div",null,o.a.createElement("a",{target:"_blank",href:"https://".concat(S.toLowerCase(),".etherscan.io/address/").concat(E[A][n].address)},E[A][n].address))),o.a.createElement("footer",null,o.a.createElement("a",{href:"https://github.com/protofire/tokens-faucet"},"Source")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var k={MetaMask:new(0,d.Connectors.InjectedConnector)({supportedNetworks:A})};r.a.render(o.a.createElement(f.a,{libraryName:"ethers.js",connectors:k},o.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[213,1,2]]]);
//# sourceMappingURL=main.a31e3aec.chunk.js.map