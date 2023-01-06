export function parseTxName(tx: string) {
  if (
    tx === "0000000000000000000000000000000000000000000000000000000000000000"
  ) {
    return "Block Reward";
  }
  return null;
}

export function shortTxString(tx: string = "", length: number = 4) {
  if (parseTxName(tx)) return parseTxName(tx);
  return tx.slice(0, length) + "..." + tx.slice(tx.length - length, tx.length);
}
