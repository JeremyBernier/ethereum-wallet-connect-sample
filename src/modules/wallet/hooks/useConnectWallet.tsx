import { useEffect, useState } from "react";
import { RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";
import walletStateAtom from "../state/wallet.atom";
import { initializeEthers, getUserInformation } from "../lib";
import { initializeContract } from "../../contract/lib/contract";
import memoryWalletStore from "../state/memoryStore";

const useConnectWallet = () => {
  const [walletState, setWalletState] = useRecoilState(walletStateAtom);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const provider = await initializeEthers();
      memoryWalletStore.provider = provider;
      const [userAddress, ensName] = await getUserInformation(provider);

      const contract = await initializeContract(provider);
      memoryWalletStore.contract = contract;

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

  useEffect(() => {
    const handleAccountsChanged = ([newAddress]) => {
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      // if (newAddress === undefined) {
      //   return this._resetState();
      // }

      connectWallet();
    };

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return { connectWallet, error, loading };
};

export default useConnectWallet;
