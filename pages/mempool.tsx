import { Box, Typography } from "@mui/material";
import io from "socket.io-client";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { BlockTx } from "../types/block";
import TransactionCollapse from "../components/TransactionCollapse";
import { getMempool } from "../api/node";
import { useAlert } from "react-alert";
const socket = io("http://localhost:3000");

export default function MempoolPage({ mempools }: { mempools: BlockTx[] }) {
  const [mpData, setMPData] = useState<BlockTx[]>(mempools);
  const alert = useAlert();
  useEffect(() => {
    socket.on("mempool", async () => {
      const _mpData = await getMempool();
      alert.success("New transaction added to mempool");
      setMPData(_mpData);
    });

    return () => {
      socket.off("mempool");
    };
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

export async function getServerSideProps() {
  const mempools = await getMempool();
  return { props: { mempools } };
}
