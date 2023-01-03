export function parseTxName(tx: string) {
  if (
    tx === "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    return "Block Reward";
  }
  return tx
}
