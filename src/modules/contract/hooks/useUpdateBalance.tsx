import { useRecoilState } from "recoil";
import walletAtom from "../../wallet/state/wallet.atom";
import contractAtom from "../state/contract.atom";

const useUpdateBalance = (contract) => {
  const [walletState] = useRecoilState(walletAtom);
  const { userAddress } = walletState;
  const [contractState, setContractState] = useRecoilState(contractAtom);

  return async () => {
    const userBalance = await contract.balanceOf(userAddress);
    setContractState((prevState) => ({ ...prevState, userBalance }));
  };
};

export default useUpdateBalance;
