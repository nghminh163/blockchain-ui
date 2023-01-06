export interface Balance {
  address: string;
  balance: number;
}

export interface UTXOTxOut {
  amount: number;
  block: number;
  received_tx: string;
  spent_tx: string | null;
  timestamp: number;
}
export interface UTXO {
  address: string;
  txouts: UTXOTxOut[];
}
