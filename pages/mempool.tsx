import { Box, Grid, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BlockDetail, BlockTx } from "../types/block";
import moment from "moment";
import Link from "next/link";
import TransactionCollapse from "../components/TransactionCollapse";
import { getMempool } from "../api/node";

export default function MempoolPage() {
  const [mpData, setMPData] = useState<BlockTx[]>();

  useEffect(() => {
    (async () => {
      try {
        const _mpData = await getMempool();
        setMPData(_mpData);
      } catch (e) {}
    })();
  }, []);
  return mpData ? (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Mempool
      </Typography>
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
        {mpData?.length === 0 ? (
          <Typography
            sx={{
              fontSize: 16,
              marginTop: 2,
            }}
          >
            Empty
          </Typography>
        ) : (
          mpData?.map((tx, i) => (
            <TransactionCollapse key={`tx-collapse-${i}`} tx={tx} idx={i} />
          ))
        )}
      </Box>
    </Layout>
  ) : (
    ""
  );
}
