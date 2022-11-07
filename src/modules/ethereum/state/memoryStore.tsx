/**
 * Was not able to store provider in Recoil, so just storing it in memory
 * since we don't care when it's updated
 */

interface WalletMemoryInterface {
  provider?: any;
}

const WalletMemoryStore: WalletMemoryInterface = {
  provider: undefined,
};
export default WalletMemoryStore;
