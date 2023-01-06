import axios from "axios";
import { URL_SERVER } from "../constants";
import { TransactionDetail } from "../types/transaction";

export async function getTransactionByHash(txHash: string) {
  const { data } = await axios.get<TransactionDetail>(
    `${URL_SERVER}/transactions/${txHash}`
  );
  return data;
}
