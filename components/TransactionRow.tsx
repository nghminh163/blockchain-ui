import { Box, Typography } from "@mui/material";
import { isNumber } from "lodash";
import Link from "next/link";
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
  return (
    <Box sx={{ marginTop: 2, borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <Typography variant="body1" sx={{ marginRight: 2, fontSize: 14 }}>
          #{id}
        </Typography>
        <div>
          <Box display="flex" gap={0.5}>
            {address === "Block Reward" ? (
              <Typography
                component="span"
                sx={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {address}
              </Typography>
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
                  {address}
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

          {prevTx && (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Previous Tx:{" "}
              <Link href={`/transactions/${prevTx}`}>
                {shortTxString(prevTx)}
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
