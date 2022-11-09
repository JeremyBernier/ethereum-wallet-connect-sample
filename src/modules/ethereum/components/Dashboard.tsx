import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ethers } from "ethers";
import Link from "next/link";
import WalletMemoryStore from "../state/memoryStore";
import { getUserEthBalance } from "../lib";
import walletStateAtom from "../state/atom";
import SendEth from "./SendEth";
import { getEtherscanLink } from "../utils";
import CustomTokenView from "./CustomTokenView";

const Dashboard = () => {
  const [walletState, setWalletState] = useRecoilState(walletStateAtom);
  const { ethBalance } = walletState;
  const { provider } = WalletMemoryStore;

  const userWalletName = walletState?.ensName || walletState?.userAddress;

  useEffect(() => {
    (async () => {
      const _ethBalance = await getUserEthBalance(
        provider,
        walletState.userAddress
      );
      setWalletState((prevState) => ({
        ...prevState,
        ethBalance: _ethBalance,
      }));
    })();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Ethereum Dashboard</h1>
      <div>
        <div>
          {ethBalance && (
            <div>Eth Balance: {ethers.utils.formatEther(ethBalance)}</div>
          )}
        </div>
        {userWalletName && (
          <div>
            <Link href={getEtherscanLink(userWalletName)} target="_blank">
              Etherscan link
            </Link>
          </div>
        )}
      </div>
      <SendEth />
      <CustomTokenView />
    </div>
  );
};

export default Dashboard;
