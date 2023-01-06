import axios from "axios";
import { URL_SERVER } from "../constants";
import { Balance, UTXO, IHistory } from "../types/address";

export async function getBalance(address = "me") {
  const { data } = await axios.get<Balance>(
    `${URL_SERVER}/addr/balance/${address}`
  );
  return data;
}

export async function getUTXO(address = "me", page = 1, perPage = 10) {
  const { data } = await axios.get<UTXO>(
    `${URL_SERVER}/addr/utxo/${address}?page=${page}&per_page=${perPage}`
  );
  return data;
}

export async function getHistory(address = "me", page = 1, perPage = 10) {
  const { data } = await axios.get<IHistory>(
    `${URL_SERVER}/addr/history/${address}?page=${page}&per_page=${perPage}`
  );
  return data;
}
