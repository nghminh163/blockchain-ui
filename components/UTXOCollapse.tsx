import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Popover,
  Grid,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { useState, MouseEvent, useMemo } from "react";
import { UTXOTxOut } from "../types/address";
import moment from "moment";

export default function UTXOCollapse({ txOut }: { txOut: UTXOTxOut }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const isSpent = useMemo(() => txOut.spent_tx !== null, [txOut]);
  return (
    <Accordion sx={{ marginTop: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`tx-0-content`}
        id={`tx-0-header`}
      >
        <Box
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{ marginRight: 2 }}
        >
          {isSpent ? <CheckCircleIcon /> : <DoDisturbOnIcon />}
        </Box>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            {isSpent
              ? "Spent coin is a transaction output that is already used as input of another transaction"
              : "Unspent coin is a transaction output that has not been used as input in any other transaction"}
          </Typography>
        </Popover>

        <Typography>
          {txOut.amount} UCoin - Block #{txOut.block}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <>
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
                  fontSize: 18,
                  lineHeight: "28px",
                }}
              >
                {moment.unix(txOut.timestamp).format("DD/MM/YYYY HH:mm:ss")}
              </Typography>
            </Grid>
            <Grid item xs={2}>
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
                href={`/blocks/${txOut.block}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#1e2329",
                    fontSize: 18,
                    lineHeight: "28px",
                    textDecoration: "underline",
                  }}
                >
                  {txOut.block}
                </Typography>
              </Link>
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
                Amount
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: "#1e2329",
                  fontSize: 18,
                  lineHeight: "28px",
                }}
              >
                <Box display="flex">
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: "#1e2329",
                    }}
                    component={"span"}
                  >
                    100 UCoin
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 18,
                      marginLeft: 0.5,
                      color: "#1e2329",
                    }}
                    component="span"
                  >
                    ≈ $1000
                  </Typography>
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 2 }}>
            <Typography
              sx={{
                color: "#474d57",
                fontSize: 12,
                lineHeight: "32px",
                fontWeight: "bold",
              }}
            >
              Receive Transaction
            </Typography>
            <Link
              href={`/transactions/${txOut.received_tx}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                component="span"
                sx={{
                  color: "#1e2329",
                  fontSize: 18,
                  lineHeight: "28px",
                  textDecoration: "underline",
                }}
              >
                {txOut.received_tx}
              </Typography>
            </Link>
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
              Spend Transaction
            </Typography>
            {txOut.spent_tx === null ? (
              <Typography
                component="span"
                sx={{
                  color: "#1e2329",
                  fontSize: 18,
                  lineHeight: "28px",
                }}
              >
                Coin is unspent so spend transaction not found
              </Typography>
            ) : (
              <Link
                href={`/transactions/${txOut.spent_tx}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#1e2329",
                    fontSize: 18,
                    lineHeight: "28px",
                    textDecoration: "underline",
                  }}
                >
                  {txOut.spent_tx}
                </Typography>
              </Link>
            )}
          </Box>
        </>
      </AccordionDetails>
    </Accordion>
  );
}
