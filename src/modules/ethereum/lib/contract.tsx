import { ethers } from "ethers";
import TokenArtifact from "src/contracts/Token.json";
import contractAddress from "src/contracts/contract-address.json";

export function initializeContract(provider) {
  return new ethers.Contract(
    contractAddress.Token,
    TokenArtifact.abi,
    provider.getSigner(0)
  );
}

export async function getTokenData(token) {
  return Promise.all([token.name(), token.symbol()]);
}

export async function transferTokens(contract, recipientAddress, tokenAmount) {
  const transaction = await contract.transfer(recipientAddress, tokenAmount);
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
  return transaction;
}

// export async function updateBalance(token) {
//   const balance = await token.balanceOf(this.state.selectedAddress);
//   this.setState({ balance });
// }

// export async function transferTokens(token, to, amount) {
//   // Sending a transaction is a complex operation:
//   //   - The user can reject it
//   //   - It can fail before reaching the ethereum network (i.e. if the user
//   //     doesn't have ETH for paying for the tx's gas)
//   //   - It has to be mined, so it isn't immediately confirmed.
//   //     Note that some testing networks, like Hardhat Network, do mine
//   //     transactions immediately, but your dapp should be prepared for
//   //     other networks.
//   //   - It can fail once mined.
//   //
//   // This method handles all of those things, so keep reading to learn how to
//   // do it.

//   try {
//     // If a transaction fails, we save that error in the component's state.
//     // We only save one such error, so before sending a second transaction, we
//     // clear it.
//     this._dismissTransactionError();

//     // We send the transaction, and save its hash in the Dapp's state. This
//     // way we can indicate that we are waiting for it to be mined.
//     const transaction = await token.transfer(to, amount);
//     this.setState({ txBeingSent: transaction.hash });

//     // We use .wait() to wait for the transaction to be mined. This method
//     // returns the transaction's receipt.
//     const receipt = await transaction.wait();

//     // The receipt, contains a status flag, which is 0 to indicate an error.
//     if (receipt.status === 0) {
//       // We can't know the exact error that made the transaction fail when it
//       // was mined, so we throw this generic one.
//       throw new Error("Transaction failed");
//     }

//     // If we got here, the transaction was successful, so you may want to
//     // update your state. Here, we update the user's balance.
//     await this._updateBalance();
//   } catch (error) {
//     // We check the error code to see if this error was produced because the
//     // user rejected a tx. If that's the case, we do nothing.
//     if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
//       return;
//     }

//     // Other errors are logged and stored in the Dapp's state. This is used to
//     // show them to the user, and for debugging.
//     console.error(error);
//     this.setState({ transactionError: error });
//   } finally {
//     // If we leave the try/catch, we aren't sending a tx anymore, so we clear
//     // this part of the state.
//     this.setState({ txBeingSent: undefined });
//   }
// }
