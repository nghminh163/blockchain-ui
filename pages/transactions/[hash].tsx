import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { TransactionRow } from "../../components/TransactionRow";
import { useEffect, useMemo, useState } from "react";
import { TransactionDetail } from "../../types/transaction";
import { getTransactionByHash } from "../../api/transactions";
import { shortTxString } from "../../utils/parseTxName";
import moment from "moment";
import { BlockDetail } from "../../types/block";
import { getBlockByHeight } from "../../api/blocks";
import Link from "next/link";
import { ScriptDialog } from "../../components/TransactionCollapse";
export default function BlockDetailPage() {
  const router = useRouter();
  const hash = useMemo(() => router.query.hash as string, [router.query.hash]);
  const [blockData, setBlockData] = useState<BlockDetail>();
  const [txData, setTxData] = useState<TransactionDetail>();
  const [open, setOpen] = useState<{ isFrom: boolean; content: string }>();

  useEffect(() => {
    (async () => {
      if (hash) {
        try {
          const _txData = await getTransactionByHash(hash);
          const _blockData = await getBlockByHeight(_txData.block);
          setTxData(_txData);
          setBlockData(_blockData);
        } catch (e) {}
      }
    })();
  }, [hash]);
  return txData ? (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Detail of Transaction {shortTxString(txData.hash)}
      </Typography>
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
          paddingY: 4,
        }}
      >
        <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
          Overview
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Grid container>
            {blockData?.header?.timestamp && (
              <Grid item xs={2.5}>
                <Typography
                  sx={{
                    color: "#474d57",
                    fontSize: 12,
                    lineHeight: "32px",
                    fontWeight: "bold",
                  }}
                >
                  Time
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: "#1e2329",
                    fontSize: 20,
                    lineHeight: "28px",
                  }}
                >
                  {moment
                    .unix(blockData?.header?.timestamp)
                    .format("DD/MM/YYYY HH:mm:ss")}
                </Typography>
              </Grid>
            )}
            <Grid item xs={1.2}>
              <Typography
                sx={{
                  color: "#474d57",
                  fontSize: 12,
                  lineHeight: "32px",
                  fontWeight: "bold",
                }}
              >
                Block
              </Typography>

              <Link
                href={`/blocks/${txData.block}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#1e2329",
                    fontSize: 20,
                    lineHeight: "28px",
                    textDecoration: "underline",
                  }}
                >
                  #0
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography
            sx={{
              color: "#474d57",
              fontSize: 12,
              lineHeight: "32px",
              fontWeight: "bold",
            }}
          >
            Hash
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#1e2329",
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            {txData.hash}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
          paddingY: 4,
        }}
      >
        <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
          Transactions
        </Typography>
        <Grid container sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              From
            </Typography>
            {txData.inputs.map((input, j) => {
              const isCoinBase =
                "0000000000000000000000000000000000000000000000000000000000000000";
              return (
                <TransactionRow
                  key={`tx-input-${j}`}
                  id={j}
                  address={isCoinBase ? "Block Reward" : ""}
                  isFrom
                  amount={isCoinBase ? 0 : 111111}
                  onClick={() =>
                    setOpen({
                      isFrom: true,
                      content: input.unlocking_script,
                    })
                  }
                  // prevTx={input.prev_tx}
                />
              );
            })}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">To</Typography>
            {txData.outputs.map((output, j) => {
              return (
                <TransactionRow
                  key={`tx-output-${j}`}
                  id={j}
                  address={output.addr}
                  amount={output.amount}
                  onClick={() =>
                    setOpen({
                      isFrom: false,
                      content: output.locking_script,
                    })
                  }
                />
              );
            })}
          </Grid>
        </Grid>
      </Box>
      <ScriptDialog open={open} onClose={() => setOpen(undefined)} />
    </Layout>
  ) : (
    "Not found"
  );
}
