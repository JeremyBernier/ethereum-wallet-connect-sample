import { useState } from "react";
import { RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";
import walletStateAtom from "../state/atom";
import { initializeEthers, getUserInformation } from "../lib";
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
      setWalletState((walletState) => ({
        ...walletState,
        userAddress,
        ensName,
      }));
      setError(undefined);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
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
