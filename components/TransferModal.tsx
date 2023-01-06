import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  DialogActions,
  Button,
  OutlinedInput,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { setTimeout } from "timers/promises";
import { URL_SERVER } from "../constants";

export default function TransferModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmitClick = async () => {
    try {
      await axios.post(URL_SERVER + "/transactions", {
        amount: parseInt(amount.toString()),
        receiver,
      });
      onClose();
      router.push("/mempool");
    } catch (err: any) {
      if (err instanceof AxiosError<{ message: string }>) {
        setError(err?.response?.data?.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
      <DialogTitle>Transfer Money</DialogTitle>
      <DialogContent>
        <Box>
          <Typography>Internal transfers are free on UCoin Network</Typography>
          <Box sx={{ marginTop: 3 }}>
            <Typography
              sx={{
                color: "#474d57",
                fontSize: 14,
              }}
            >
              Amount
            </Typography>
            <OutlinedInput
              sx={{
                backgroundClor: "#f5f5f5",
              }}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              fullWidth
              inputProps={{
                style: {
                  height: 48,
                  padding: "0 12px",
                },
              }}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography
              sx={{
                color: "#474d57",
                fontSize: 14,
              }}
            >
              Receiver
            </Typography>
            <OutlinedInput
              sx={{
                backgroundClor: "#f5f5f5",
              }}
              onChange={(e) => setReceiver(e.target.value)}
              fullWidth
              inputProps={{
                style: {
                  height: 48,
                  padding: "0 12px",
                },
              }}
            />
          </Box>
        </Box>
        {error && (
          <Typography sx={{ marginTop: 0.5, color: "red" }}>
            Error: {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmitClick} variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
