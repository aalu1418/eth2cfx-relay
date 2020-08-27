//preprocessing function
module.exports = (method, params) => {
  return [methodFilter(method), epochFilter(params)];
};

//currently supported eth calls with equivlanet cfx calls
const eth2cfx = {
  eth_gasPrice: "cfx_gasPrice",
  eth_blockNumber: "cfx_epochNumber",
  eth_getBalance: "cfx_getBalance",
  eth_getStorageAt: "cfx_getStorageAt",
  eth_getTransactionCount: "cfx_getNextNonce",
  eth_getCode: "cfx_getCode",
  eth_sendRawTransaction: "cfx_sendRawTransaction",
  eth_call: "cfx_call",
  eth_estimateGas: "cfx_estimateGasAndCollateral",
  eth_getBlockByHash: "cfx_getBlockByHash",
  eth_getBlockByNumber: "cfx_getBlockByEpochNumber",
  // eth_getTransactionByHash: "cfx_getTransactionByHash", //custom handler created for getTransactionByHash (see index.js)
  eth_getTransactionReceipt: "cfx_getTransactionReceipt",
  eth_getLogs: "cfx_getLogs" //caution about using cfx_getLogs (default fromEpoch is latest_checkpoint (earliest epoch in memory))
};

//get the corresponding cfx method based on the eth method
const methodFilter = method => {
  return method.includes("cfx_") ? method : eth2cfx[method];
};

//fixing the difference in epoch/block parameter
const epochFilter = params => {
  let newParams;
  if (params && params.length > 0) {
    newParams = params.map(param =>
      param == "latest" || param == "pending" ? "latest_state" : param
    );
  }
  return newParams;
};
