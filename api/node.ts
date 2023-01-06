import axios from "axios";
import { URL_SERVER } from "../constants";
import { BlockTx } from "../types/block";
import { PeerResponse } from "../types/node";

export async function getPeers(page = 1, perPage = 10) {
  const { data } = await axios.get<PeerResponse>(
    `${URL_SERVER}/node/peers?page=${page}&per_page=${perPage}`
  );
  return data;
}

export async function getMempool() {
  const { data } = await axios.get<BlockTx[]>(`${URL_SERVER}/node/mempool`);
  return data;
}
