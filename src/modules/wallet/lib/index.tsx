import { ethers } from "ethers";

// Would normally store this in environment variables (eg. a .env file)
const ETHEREUM_NETWORK_ID = "1";
const NETWORK_ID = ETHEREUM_NETWORK_ID;
const NETWORK_NAME = "Ethereum";

export async function initializeEthers() {
  if (!window.ethereum) {
    throw new Error("Could not find Metamask or other crypto wallet");
  }

  // if (window.ethereum.networkVersion !== NETWORK_ID) {
  //   throw new Error(
  //     `Please connect your wallet to the ${NETWORK_NAME} network`
  //   );
  // }

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  return provider;
}

export async function getUserInformation(provider) {
  const signer = provider.getSigner();

  const userAddress = await signer.getAddress();
  const ensName = undefined;
  // const ensName = await provider.lookupAddress(userAddress);

  return [userAddress, ensName];
}

export async function getUserEthBalance(provider, userAddress) {
  return provider.getBalance(userAddress);
}
