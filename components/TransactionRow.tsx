import { Box, Typography } from "@mui/material";

interface ITransactionRowProps {
  id: number;
  address: string;
  isFrom?: boolean;
}
export function TransactionRow({ id, address, isFrom }: ITransactionRowProps) {
  return (
    <Box sx={{ marginTop: 2, borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <Typography variant="body1" sx={{ marginRight: 2, fontSize: 14 }}>
          #{id}
        </Typography>
        <div>
          <Box display="flex" gap={0.5}>
            <Typography
              component="span"
              sx={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {address}
            </Typography>

            {"•"}
            <Typography
              component="span"
              onClick={() => alert(1)}
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 14,
                color: "#e64a19",
              }}
            >
              {isFrom ? "Locking" : "Unlocking"}
              {" script"}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            10 UCoin
          </Typography>
        </div>
      </div>
    </Box>
  );
}
