export function shortenedCryptoAddress(address: string): string | null {
  if (address == null) {
    return null;
  }
  if (address.length < 13) {
    return address;
  }
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}

export function getEtherscanLink(address) {
  return `https://etherscan.io/address/${address}`;
}
