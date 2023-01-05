import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import moment from "moment";
import router, { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { getBlockByHeight } from "../api/blocks";
import { BlockDetail } from "../types/block";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { parseTxName } from "../utils/parseTxName";

export default function BlockDetailPage() {
  const [blockData, setBlockData] = useState<BlockDetail>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const currHeight = useMemo(() => {
    const height = router.query?.height;
    if (height) {
      try {
        return parseInt(height.toString());
      } catch (e) {}
    }
    return undefined;
  }, [router.query?.height]);
  useEffect(() => {
    (async () => {
      const height = router.query?.height;
      if (height) {
        try {
          const block = await getBlockByHeight(parseInt(height.toString()));
          setBlockData(block);
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoading(false);
    })();
  }, [router.query?.height]);
  return isLoading ? (
    <span>Loading</span>
  ) : blockData ? (
    <BlockDetailUI blockData={blockData} currHeight={currHeight} />
  ) : (
    <span>Block not found</span>
  );
}

function BlockDetailUI({
  blockData,
  currHeight,
}: {
  blockData: BlockDetail;
  currHeight: number;
}) {
  return (
    <Box m={1}>
      <Typography variant="h4">
        Detail of block #{blockData.header.height}
      </Typography>
      <Box marginBottom={0.5}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6">Bits: {blockData.header.bits}</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6">Hash: {blockData.header.hash}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">
              Nonce: {blockData.header.nonce}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6">
              Merkel Root: {blockData.header.merkle_root}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">
              Time:{" "}
              {moment
                .unix(blockData.header.timestamp)
                .format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6">
              Previous block hash:{" "}
              {currHeight !== 0 ? (
                <Link href={`/blocks/${currHeight - 1}`}>
                  {blockData.header.prev_block_hash}
                </Link>
              ) : (
                blockData.header.prev_block_hash
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {blockData.transactions.length > 0 &&
        blockData.transactions.map((tx, i) => (
          <Accordion key={`tx-${i}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`tx-${i}-content`}
              id={`tx-${i}-header`}
            >
              <Typography>
                Transaction #{i} ({tx.hash})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6">From</Typography>
                  {tx.inputs.map((input, j) => (
                    <Box key={`tx-${i}-input-${j}`}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                          #{j + 1}
                        </Typography>
                        <div>
                          <Typography variant="body1">
                            {parseTxName(input.prev_tx)}
                          </Typography>
                          <Typography variant="body1">
                            {/* {input..amount} UCoin */}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">To</Typography>
                  {tx.outputs.map((output, j) => (
                    <Box key={`tx-${i}-output-${j}`}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                          #{j + 1}
                        </Typography>
                        <div>
                          <Typography variant="body1">
                            Address: {output.addr}
                          </Typography>
                          <Typography variant="body1">
                            {output.amount} UCoin
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
