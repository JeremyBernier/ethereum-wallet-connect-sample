// const FRONTEND_SRC_PATH = "frontend";
const path = require("path");

export const CONTRACT_OUTPUT_FILENAME = "contract-address.json";
export const contractsDir = path.join(
  __dirname,
  "../",
  // FRONTEND_SRC_PATH,
  "src",
  "contracts"
);
