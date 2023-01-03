import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { URL_SERVER } from "../constants";

export default function TransferPage() {
  const [amount, setAmount] = React.useState("");
  const [receiver, setReceiver] = React.useState("");
  const onSubmitClick = () => {
    axios.post(URL_SERVER + "/transactions", {
      amount: parseInt(amount.toString()),
      receiver,
    });
  };
  return (
    <Box m={2} display="flex" justifyContent={"center"}>
      <Grid
        container
        gap={2}
        display="flex"
        justifyContent={"center"}
        direction="column"
      >
        <TextField
          label="Amount"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          label="Receiver"
          variant="outlined"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <Button onClick={onSubmitClick}>Submit</Button>
      </Grid>
    </Box>
  );
}
