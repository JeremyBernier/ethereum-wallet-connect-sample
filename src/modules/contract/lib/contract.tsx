import { ethers } from "ethers";
import TokenArtifact from "src/contracts/Token.json";
import contractAddress from "src/contracts/contract-address.json";

export function initializeContract(provider) {
  return new ethers.Contract(
    contractAddress.Token,
    TokenArtifact.abi,
    provider.getSigner(0)
  );
}

export async function getTokenData(token) {
  return Promise.all([token.name(), token.symbol()]);
}
