import { useState } from "react";
import { useRecoilState } from "recoil";
import WalletMemoryStore from "src/modules/wallet/state/memoryStore";
import walletStateAtom from "src/modules/wallet/state/wallet.atom";
import useSendTokens from "../hooks/useSendTokens";

const SendCustomToken = ({ tokenSymbol, tokenName }) => {
  const { contract } = WalletMemoryStore;

  const [tokenAmount, setTokenAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const { sendTokens, loading, error, transaction } = useSendTokens(contract);

  const onSubmit = async (event) => {
    event.preventDefault();
    await sendTokens(recipientAddress, tokenAmount);
  };

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
