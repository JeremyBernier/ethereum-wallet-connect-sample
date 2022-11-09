import { atom } from "recoil";

interface ContractState {
  tokenName?: string;
  tokenSymbol?: string;
  tokenSupply?: number;
  userBalance?: number;
}

const initialState: ContractState = {
  tokenName: undefined,
  tokenSymbol: undefined,
  tokenSupply: undefined,
  userBalance: undefined,
};

const contractState = atom({
  key: "contractState",
  default: initialState,
});

export default contractState;
