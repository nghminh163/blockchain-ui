import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TransactionRow } from "../../components/TransactionRow";

export default function BlockDetailPage() {
  return (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Detail of Block #0
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
                04/01/2023 23:21:19
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
                836137
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
                0x1f0fffff
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
            00013124edde6740c2a112342021e759e21403df77cbf7406d598d434f2f4be8
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
            36e11e3c1651267cfb0f002908e1a610d250cbca7e24fbd7b5853a19d11a4e65
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
            Previous block hash
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#1e2329",
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            0000000000000000000000000000000000000000000000000000000000000000
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
        <Box sx={{ marginTop: 2 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`tx-0-content`}
              id={`tx-0-header`}
            >
              <Typography>
                <b>Transaction</b> #0 -{" "}
                <Typography
                  onClick={(e) => {
                    e.stopPropagation();
                    // Copy to clipboard
                  }}
                  component={"span"}
                  sx={{ color: "#ad9223" }}
                >
                  (00013...4be8)
                </Typography>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      From
                    </Typography>
                    <TransactionRow id={1} address="0" isFrom />
                    <TransactionRow id={1} address="0" isFrom />
                    <TransactionRow id={1} address="0" isFrom />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">To</Typography>
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Layout>
  );
}
