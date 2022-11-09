import { useState } from "react";
import { ethers } from "ethers";
import WalletMemoryStore from "../state/memoryStore";

const SendEth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ethAmount, setEthAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const { provider } = WalletMemoryStore;
  const signer = provider.getSigner();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(String(ethAmount)),
      });
    } catch (err) {
      if (err?.code !== "ACTION_REJECTED") {
        console.error(err);
        setError(String(err));
      }
      // window.alert(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 px-6 pb-6 pt-4 rounded space-y-3">
      <h3 className="text-xl font-bold">Send Ether</h3>
      {error && <div className="text-red-500">{error}</div>}
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <input
            type="number"
            className="input"
            placeholder="Eth Amount"
            value={ethAmount}
            onChange={(event) => setEthAmount(event.target.value)}
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
            <input type="submit" value="Send Eth" className="btn" />
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

export default SendEth;
