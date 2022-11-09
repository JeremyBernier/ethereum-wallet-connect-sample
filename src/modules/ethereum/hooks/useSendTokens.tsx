import { useState } from "react";
import useUpdateBalance from "./useUpdateBalance";

const useSendTokens = (contract) => {
  const updateBalance = useUpdateBalance(contract);
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendTokens = async (recipientAddress, tokenAmount) => {
    setTransaction(null);
    setLoading(true);
    setError(null);

    try {
      const transaction = await contract.transfer(
        recipientAddress,
        tokenAmount
      );

      setTransaction(transaction.hash);

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await transaction.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        setError("Transaction failed");
      }
    } catch (err) {
      if (err?.code !== "ACTION_REJECTED") {
        console.error(err);
        setError(String(err));
      }
      return;
    }
    setLoading(false);
    setError(null);

    updateBalance();

    // If we got here, the transaction was successful, so you may want to
    // update your state. Here, we update the user's balance.
  };
  return { sendTokens, error, loading, transaction };
};

export default useSendTokens;
