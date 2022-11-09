/**
 * Was not able to store provider in Recoil, so just storing it in memory
 * since we don't care when it's updated
 */

interface WalletMemoryInterface {
  provider?: any;
  contract?: any;
}

const WalletMemoryStore: WalletMemoryInterface = {
  provider: undefined,
  contract: undefined,
};
export default WalletMemoryStore;
