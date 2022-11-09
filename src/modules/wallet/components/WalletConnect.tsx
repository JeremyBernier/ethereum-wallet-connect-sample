import { useState } from "react";
import { RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";
import { ethers } from "ethers";
import walletStateAtom from "../state/wallet.atom";
import { initializeEthers, getUserInformation } from "../lib";
import { initializeContract } from "../../contract/lib/contract";
import memoryWalletStore from "../state/memoryStore";
import { shortenedCryptoAddress } from "../utils";

const WalletConnect = () => {
  const [walletState, setWalletState] = useRecoilState(walletStateAtom);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onClickConnectWallet = async (event) => {
    setLoading(true);
    setError(undefined);
    try {
      const provider = await initializeEthers();
      memoryWalletStore.provider = provider;
      const [userAddress, ensName] = await getUserInformation(provider);

      const contract = await initializeContract(provider);
      memoryWalletStore.contract = contract;
      // console.log("contract", contract);
      // const balance = await contract.balanceOf(userAddress);
      // console.log("balance", ethers.utils.formatUnits(balance, 0));

      // const tokenName = await contract.name();
      // const symbol = await contract.symbol();
      // console.log("tokenName, symbol", tokenName, symbol);
      // const totalSupply = await contract.totalSupply();
      // console.log("totalSupply", ethers.utils.formatUnits(totalSupply, 0));

      setWalletState((walletState) => ({
        ...walletState,
        userAddress,
        ensName,
      }));
    } catch (err) {
      console.error(err);
      setError(err.message);
      return;
    }
    setLoading(false);
    setError(undefined);
  };

  const userWalletName =
    walletState?.ensName ||
    (walletState?.userAddress
      ? shortenedCryptoAddress(walletState.userAddress)
      : null);

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      {userWalletName ? (
        <button className="btn transparent">{userWalletName}</button>
      ) : (
        <button
          className="btn"
          onClick={onClickConnectWallet}
          disabled={loading}
        >
          {!loading ? "Connect Wallet" : "Connecting Wallet..."}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
