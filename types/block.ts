import { TxIn, TxOut } from "./transaction";

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

export interface BlockTx {
  hash: string;
  inputs: TxIn[];
  outputs: TxOut[];
}

export interface BlockDetail {
  header: BlockHeader;
  miner: string;
  transactions: BlockTx[];
}

export interface BlockResponse {
  blocks: Block[];
  total: number;
}
