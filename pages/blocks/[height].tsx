import { Box, Grid, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import { BlockDetail } from "../../types/block";
import { getBlockByHeightSSR } from "../../api/blocks";
import moment from "moment";
import Link from "next/link";
import TransactionCollapse from "../../components/TransactionCollapse";

export default function BlockDetailPage({
  blockDetail,
}: {
  blockDetail: BlockDetail;
}) {
  return blockDetail ? (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Detail of Block #{blockDetail?.header?.height}
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
                  .unix(blockDetail?.header?.timestamp)
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
                {blockDetail?.header?.nonce}
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
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
                {blockDetail?.header?.bits}
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
                Miner
              </Typography>
              <Link
                href={"/address/" + blockDetail?.miner}
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
                  {blockDetail?.miner}
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
            {blockDetail?.header?.height === 0 ? "Genesis" : "Block"} hash
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#1e2329",
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            {blockDetail?.header?.hash}
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
            {blockDetail?.header?.merkle_root}
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
          {blockDetail?.header?.height === 0 ? (
            <Typography
              component="span"
              sx={{
                color: "#1e2329",
                fontSize: 20,
                lineHeight: "28px",
              }}
            >
              {blockDetail?.header?.prev_block_hash}
            </Typography>
          ) : (
            <Link
              href={`/blocks/${blockDetail?.header?.height - 1}`}
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
                {blockDetail?.header?.prev_block_hash}
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
        {blockDetail?.transactions?.map((tx, i) => (
          <TransactionCollapse key={`tx-collapse-${i}`} tx={tx} idx={i} />
        ))}
      </Box>
    </Layout>
  ) : (
    ""
  );
}

export async function getServerSideProps({
  params: { height },
}: {
  params: { height: string };
}) {
  try {
    const _height = parseInt(height as string);
    const blockDetail = await getBlockByHeightSSR(_height);
    return { props: { blockDetail } };
  } catch (e) {
    throw e;
  }
}
