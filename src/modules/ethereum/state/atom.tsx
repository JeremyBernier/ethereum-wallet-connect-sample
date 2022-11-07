import { atom } from "recoil";

interface WalletState {
  userAddress?: string;
  ensName?: string;
  ethBalance?: any;
}

const initialState: WalletState = {
  userAddress: undefined,
  ensName: undefined,
  ethBalance: undefined,
};

const walletState = atom({
  key: "walletState",
  default: initialState,
});

export default walletState;
