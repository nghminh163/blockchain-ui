import { useEffect, useState } from "react";
import { getBalance } from "../api/address";
import { Balance } from "../types/address";

export default function useMeWallet() {
  const [wallet, setWallet] = useState<Balance>({
    address: "",
    balance: 0,
  });
  useEffect(() => {
    (async () => {
      const _wallet = await getBalance();
      setWallet(_wallet);
    })();
  }, []);
  return wallet;
}
