import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { TransactionRow } from "./TransactionRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BlockTx } from "../types/block";
import { shortTxString } from "../utils/parseTxName";
import { useState } from "react";
import { useRouter } from "next/router";

// TODO: Added amount input

export default function TransactionCollapse({
  tx,
  idx,
}: {
  tx: BlockTx;
  idx: number;
}) {
  const [open, setOpen] = useState<{ isFrom: boolean; content: string }>();
  const router = useRouter();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <b>Transaction</b> #{idx + 1} -{" "}
            <Typography
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/transactions/${tx.hash}`);
              }}
              component={"span"}
              sx={{ color: "#ad9223" }}
            >
              ({shortTxString(tx.hash)})
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
                {tx.inputs.map((input, j) => {
                  const isCoinBase =
                    input.prev_tx ===
                    "0000000000000000000000000000000000000000000000000000000000000000";
                  return (
                    <TransactionRow
                      key={`tx-collapse-${idx}-input-${j}`}
                      id={j}
                      address={
                        isCoinBase ? "Block Reward" : input?.prev_output?.addr
                      }
                      prevTx={input.prev_tx}
                      isFrom
                      amount={isCoinBase ? 0 : input?.prev_output?.amount}
                      onClick={() =>
                        setOpen({
                          isFrom: true,
                          content: input.unlocking_script,
                        })
                      }
                    />
                  );
                })}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">To</Typography>
                {tx.outputs.map((output, j) => {
                  return (
                    <TransactionRow
                      key={`tx-collapse-${idx}-input-${j}`}
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
        </AccordionDetails>
      </Accordion>
      <ScriptDialog open={open} onClose={() => setOpen(undefined)} />
    </Box>
  );
}

export function ScriptDialog({
  open,
  onClose,
}: {
  open?: { isFrom: boolean; content: string };
  onClose: () => void;
}) {
  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{open?.isFrom ? "Unlocking" : "Locking"} script</DialogTitle>
      <DialogContent>{open?.content}</DialogContent>
    </Dialog>
  );
}
