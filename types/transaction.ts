export interface TransactionDetail {
  block: number;
  hash: string;
  inputs: TxIn[];
  outputs: TxOut[];
}

export interface TxIn {
  output_index: number;
  prev_tx: string;
  unlocking_script: string;
  prev_output: TxOut;
}

export interface TxOut {
  addr: string;
  amount: number;
  locking_script: string;
}
