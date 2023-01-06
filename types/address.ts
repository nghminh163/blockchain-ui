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
  total: number;
}

export interface IHistory {
  address: string;
  total: number;
  history: {
    amount: number;
    block: number;
    from_addr: null | string;
    timestamp: number;
    to_addr: string;
    tx_hash: string;
    tx_type: "IN" | "OUT";
  }[];
}
