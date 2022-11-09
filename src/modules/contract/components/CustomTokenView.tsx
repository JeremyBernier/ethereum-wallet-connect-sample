import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import WalletMemoryStore from "src/modules/wallet/state/memoryStore";
import walletStateAtom from "src/modules/wallet/state/wallet.atom";
import contractStateAtom from "../state/contract.atom";
import SendCustomToken from "./SendCustomToken";

const CustomTokenView = () => {
  const { contract } = WalletMemoryStore;
  const [walletState] = useRecoilState(walletStateAtom);
  const { userAddress } = walletState;
  const [contractState, setContractState] = useRecoilState(contractStateAtom);
  const { tokenName, tokenSymbol, tokenSupply, userBalance } = contractState;

  useEffect(() => {
    (async () => {
      const [tokenName, tokenSymbol, tokenSupply, userBalance] =
        await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.totalSupply(),
          contract.balanceOf(userAddress),
        ]);
      setContractState((prevState) => ({
        tokenName,
        tokenSymbol,
        tokenSupply,
        userBalance,
      }));
    })();
  }, [contract, userAddress, setContractState]);

  return (
    <article className="bg-gray-800 px-6 pb-6 pt-4 rounded space-y-3">
      <h2 className="font-bold text-lg">
        {tokenName} ({tokenSymbol})
      </h2>
      <div>
        Total Supply:{" "}
        {tokenSupply ? ethers.utils.formatUnits(tokenSupply, 0) : 0}
      </div>
      <div>
        User Balance:{" "}
        {userBalance ? ethers.utils.formatUnits(userBalance, 0) : 0}
      </div>
      <SendCustomToken tokenSymbol={tokenSymbol} tokenName={tokenName} />
    </article>
  );
};

export default CustomTokenView;
