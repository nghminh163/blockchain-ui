import { Box, Typography } from "@mui/material";
import { add, isNumber } from "lodash";
import Link from "next/link";
import { useMemo } from "react";
import { RATE_UCOIN } from "../constants";
import { shortTxString } from "../utils/parseTxName";

interface ITransactionRowProps {
  id: number;
  address: string;
  isFrom?: boolean;
  prevTx?: string;
  amount?: number;
  onClick: () => void;
}
export function TransactionRow({
  id,
  address,
  isFrom,
  prevTx,
  amount,
  onClick,
}: ITransactionRowProps) {
  const isCoinBase =
    prevTx ===
    "0000000000000000000000000000000000000000000000000000000000000000";
  return (
    <Box sx={{ marginTop: 2, borderBottom: "2px solid #f5f5f5" }} height={72}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <Typography variant="body1" sx={{ marginRight: 2, fontSize: 14 }}>
          #{id}
        </Typography>
        <div>
          <Box display="flex" gap={0.5} alignItems="center">
            {isFrom ? (
              isCoinBase ? (
                <div style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    sx={{
                      color: "black",
                      fontSize: 15,
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {shortTxString(prevTx, 8)}
                  </Typography>
                </div>
              ) : (
                <Link
                  href={`/transactions/${prevTx}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "black",
                      fontSize: 15,
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                  >
                    {shortTxString(prevTx, 8)}
                  </Typography>
                </Link>
              )
            ) : (
              <Link
                href={`/address/${address}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  {shortTxString(address, 8)}
                </Typography>
              </Link>
            )}

            {"•"}
            <Typography
              component="span"
              onClick={onClick}
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 14,
                color: "#e64a19",
              }}
            >
              {isFrom ? "Unlocking" : "Locking"}
              {" script"}
            </Typography>
          </Box>
          {isFrom && !isCoinBase && (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: "500",
                color: "black",
              }}
            >
              From address:{" "}
              <Link
                href={`/transactions/${address}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    textDecoration: "underline",
                    fontSize: 12,
                    fontWeight: "500",
                    color: "black",
                  }}
                  component="span"
                >
                  {shortTxString(address, 8)}
                </Typography>
              </Link>
            </Typography>
          )}
          {isNumber(amount) && (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Amount: {amount} UCoin ~ ${amount * RATE_UCOIN}
            </Typography>
          )}
        </div>
      </div>
    </Box>
  );
}
