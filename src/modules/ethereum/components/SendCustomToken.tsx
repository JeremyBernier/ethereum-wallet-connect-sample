import { useState } from "react";
import { ethers } from "ethers";
import WalletMemoryStore from "../state/memoryStore";

const SendCustomToken = ({ tokenSymbol, tokenName }) => {
  const { contract } = WalletMemoryStore;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenAmount, setTokenAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const { provider } = WalletMemoryStore;

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log("transfer", recipientAddress, tokenAmount);
      console.log("0", ethers.utils.parseUnits(String(tokenAmount), 0));
      console.log("formatEther", ethers.utils.formatEther(String(tokenAmount)));
      const transaction = await contract.transfer(
        recipientAddress,
        tokenAmount
      );
      console.log("transaction", transaction);
      // await signer.sendTransaction({
      //   to: recipientAddress,
      //   value: ethers.utils.parseEther(String(tokenAmount)),
      // });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await transaction.wait();
      console.log("receipt", receipt);

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      console.log("successful");
    } catch (err) {
      if (err?.code !== "ACTION_REJECTED") {
        console.error(err);
        setError(String(err));
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 px-6 pb-6 pt-4 rounded space-y-3">
      <h3 className="text-xl font-bold">{`Send ${tokenName}`}</h3>
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
