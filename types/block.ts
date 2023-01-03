interface BlockHeader {
  bits: string;
  hash: string;
  height: number;
  merkle_root: string;
  nonce: number;
  prev_block_hash: string;
  timestamp: number;
}
interface Block extends BlockHeader {
  miner: string;
  tx_count: number;
}

export default Block;

interface BlockTx {
  hash: string;
  inputs: {
    output_index: number;
    prev_tx: string;
    unlocking_script: string;
  }[];
  outputs: {
    addr: string;
    amount: number;
    locking_script: string;
  }[];
}

export interface BlockDetail {
  header: BlockHeader;
  transactions: BlockTx[];
}
