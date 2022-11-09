import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import WalletMemoryStore from "../state/memoryStore";
import walletStateAtom from "../state/atom";
import SendCustomToken from "./SendCustomToken";

const CustomTokenView = () => {
  const [walletState] = useRecoilState(walletStateAtom);
  const { userAddress } = walletState;
  const { contract } = WalletMemoryStore;

  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [userBalance, setUserBalance] = useState();
  const [totalSupply, setTotalSupply] = useState();

  useEffect(() => {
    (async () => {
      const [_tokenName, _tokenSymbol, _totalSupply, _userBalance] =
        await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.totalSupply(),
          contract.balanceOf(userAddress),
        ]);
      setTokenName(_tokenName);
      setTokenSymbol(_tokenSymbol);
      setTotalSupply(_totalSupply);
      setUserBalance(_userBalance);
    })();
  }, [contract, userAddress]);

  return (
    <article className="bg-gray-800 px-6 pb-6 pt-4 rounded space-y-3">
      <h2 className="font-bold text-lg">
        {tokenName} ({tokenSymbol})
      </h2>
      <div>
        Total Supply:{" "}
        {totalSupply ? ethers.utils.formatUnits(totalSupply, 0) : 0}
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
