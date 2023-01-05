import { Box, Grid, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BlockDetail } from "../../types/block";
import { getBlockByHeight } from "../../api/blocks";
import moment from "moment";
import Link from "next/link";
import TransactionCollapse from "../../components/TransactionCollapse";

export default function BlockDetailPage() {
  const router = useRouter();
  const height = useMemo(
    () => router.query.height as string,
    [router.query.height]
  );
  const [blockData, setBlockData] = useState<BlockDetail>();

  useEffect(() => {
    (async () => {
      if (height) {
        try {
          const _blockData = await getBlockByHeight(parseInt(height));
          setBlockData(_blockData);
        } catch (e) {}
      }
    })();
  }, [height]);
  return blockData ? (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Detail of Block #{blockData?.header?.height}
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
            <Grid item xs={1.2}>
              <Typography
                sx={{
                  color: "#474d57",
                  fontSize: 12,
                  lineHeight: "32px",
                  fontWeight: "bold",
                }}
              >
                Nonce
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: "#1e2329",
                  fontSize: 20,
                  lineHeight: "28px",
                }}
              >
                {blockData?.header?.nonce}
              </Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography
                sx={{
                  color: "#474d57",
                  fontSize: 12,
                  lineHeight: "32px",
                  fontWeight: "bold",
                }}
              >
                Bits
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: "#1e2329",
                  fontSize: 20,
                  lineHeight: "28px",
                }}
              >
                {blockData?.header?.bits}
              </Typography>
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
            {blockData?.header?.height === 0 ? "Genesis" : "Block"} hash
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#1e2329",
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            {blockData?.header?.hash}
          </Typography>
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
            Merkel Root
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#1e2329",
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            {blockData?.header?.merkle_root}
          </Typography>
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
            Previous Block Hash
          </Typography>
          {blockData?.header?.height === 0 ? (
            <Typography
              component="span"
              sx={{
                color: "#1e2329",
                fontSize: 20,
                lineHeight: "28px",
              }}
            >
              {blockData?.header?.prev_block_hash}
            </Typography>
          ) : (
            <Link
              href={`/blocks/${blockData?.header?.height - 1}`}
              style={{
                textDecoration: "none",
              }}
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
                {blockData?.header?.prev_block_hash}
              </Typography>
            </Link>
          )}
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
        {blockData?.transactions?.map((tx, i) => (
          <TransactionCollapse key={`tx-collapse-${i}`} tx={tx} idx={i} />
        ))}
      </Box>
    </Layout>
  ) : (
    "Not found"
  );
}
