import axios from "axios";
import { URL_SERVER } from "../constants";
import { Balance } from "../types/address";

export async function getBalance(address = "me") {
  const { data } = await axios.get<Balance>(
    `${URL_SERVER}/addr/balance/${address}`
  );
  return data;
}
