import axios from "axios";
import { URL_SERVER } from "../constants";
import Block, { BlockDetail } from "../types/block";

export async function getBlocks(page = 1, perPage = 10) {
  const { data } = await axios.get<{ blocks: Block[]; total: number }>(
    `${URL_SERVER}/blocks?page=${page}&per_page=${perPage}`
  );
  return data;
}

export async function getBlockByHeight(blockHeight: number) {
  const { data } = await axios.get<BlockDetail>(
    `${URL_SERVER}/blocks/${blockHeight}`
  );
  return data;
}
