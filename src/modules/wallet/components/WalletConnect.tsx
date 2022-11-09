import { RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";
import walletStateAtom from "../state/wallet.atom";
import { shortenedCryptoAddress } from "../utils";
import useConnectWallet from "../hooks/useConnectWallet";

const WalletConnect = () => {
  const [walletState, setWalletState] = useRecoilState(walletStateAtom);
  const { connectWallet, error, loading } = useConnectWallet();

  const onClickConnectWallet = async (event) => {
    event.preventDefault();
    connectWallet();
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
