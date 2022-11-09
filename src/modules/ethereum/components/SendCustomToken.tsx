import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import WalletMemoryStore from "../state/memoryStore";
import { transferTokens } from "../lib/contract";
import walletStateAtom from "../state/wallet.atom";
import contractStateAtom from "../state/contract.atom";
import useSendTokens from "../hooks/useSendTokens";

const SendCustomToken = ({ tokenSymbol, tokenName }) => {
  const { contract } = WalletMemoryStore;

  const [tokenAmount, setTokenAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const [walletState, setWalletState] = useRecoilState(walletStateAtom);
  const [contractState, setContractState] = useRecoilState(contractStateAtom);
  const { userAddress } = walletState;

  const { provider } = WalletMemoryStore;

  const { sendTokens, loading, error, transaction } = useSendTokens(contract);

  const onSubmit = async (event) => {
    event.preventDefault();
    await sendTokens(recipientAddress, tokenAmount);
    // setLoading(true);
    // setError(null);
    // try {
    //   const transaction = await transferTokens(
    //     contract,
    //     recipientAddress,
    //     tokenAmount
    //   );
    //   console.log("transaction", transaction);

    //   // update balance
    //   const userBalance = await contract.balanceOf(userAddress);
    //   setContractState((prevState) => ({ ...prevState, userBalance }));
    // } catch (err) {
    //   if (err?.code !== "ACTION_REJECTED") {
    //     console.error(err);
    //     setError(String(err));
    //   }
    // }
    // setLoading(false);
  };

  // useEffect(() => {
  //   if (success) {
  //     setTimeout(() => {
  //       setSuccess(false);
  //     }, 3000);
  //   }
  // }, [success]);

  return (
    <div className="bg-gray-800 px-6 pb-6 pt-4 rounded space-y-3">
      <h3 className="text-xl font-bold">{`Send ${tokenName}`}</h3>
      {/* {success && <span className="text-green-500">Successfully sent!</span>} */}
      {!error && transaction && (
        <span className="text-green-500">
          Successfully sent!: Transaction ID: {transaction}
        </span>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <input
            type="number"
            className="input"
            placeholder={`${tokenSymbol} Amount`}
            value={tokenAmount}
            onChange={(event) => setTokenAmount(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Recipient's address"
            value={recipientAddress}
            onChange={(event) => setRecipientAddress(event.target.value)}
          />
        </div>
        <div>
          {!loading ? (
            <input
              type="submit"
              value={`Send ${tokenSymbol}`}
              className="btn"
            />
          ) : (
            <button className="btn" disabled>
              Sending...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SendCustomToken;
