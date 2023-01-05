export function parseTxName(tx: string) {
  if (
    tx === "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    return "Block Reward";
  }
  return null;
}

export function shortTxString(tx: string) {
  return tx.slice(0, 4) + "..." + tx.slice(tx.length - 4, tx.length);
}
