import { useRecoilState } from "recoil";
import walletStateAtom from "../state/wallet.atom";

// Returns true if user has connected wallet
const useWalletConnected = () => {
  const [walletState] = useRecoilState(walletStateAtom);
  return Boolean(walletState?.userAddress);
};

export default useWalletConnected;
