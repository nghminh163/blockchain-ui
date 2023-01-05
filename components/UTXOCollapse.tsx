import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Popover,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, MouseEvent } from "react";

export default function UTXOCollapse() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Accordion>
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
          <CheckCircleIcon />
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
            {/* Spent coin is a transaction output that is already used as input of
            another transaction */}
            Unspent coin is a transaction output that has not been used as input
            in any other transaction
          </Typography>
        </Popover>

        <Typography>50 UCoin - Block #0</Typography>
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
                04/01/2023 23:21:19
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
              <Typography
                component="span"
                sx={{
                  color: "#1e2329",
                  fontSize: 18,
                  lineHeight: "28px",
                }}
              >
                #0 (000...0000)
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
            <Typography
              component="span"
              sx={{
                color: "#1e2329",
                fontSize: 18,
                lineHeight: "28px",
              }}
            >
              0x00
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
              Spend Transaction
            </Typography>
            <Typography
              component="span"
              sx={{
                color: "#1e2329",
                fontSize: 18,
                lineHeight: "28px",
              }}
            >
              0x00
            </Typography>
          </Box>
        </>
      </AccordionDetails>
    </Accordion>
  );
}
