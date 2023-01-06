import { Box, IconButton, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UTXOCollapse from "../../components/UTXOCollapse";
import SendIcon from "@mui/icons-material/Send";
import TransferModal from "../../components/TransferModal";
import { useEffect, useMemo, useState } from "react";
import useMeWallet from "../../hook/useMeWallet";
import { useRouter } from "next/router";
import { Balance, UTXO } from "../../types/address";
import { getBalance, getUTXO } from "../../api/address";
import { isNumber } from "lodash";
import { RATE_UCOIN } from "../../constants";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// TODO: Add loding and 404 page
// TODO: Add Transactions
// TODO: Add UTXO

export default function AddressDetail() {
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);
  const [isHideBalance, setIsHideBalance] = useState(false);
  const [addressData, setAddressDate] = useState<Balance>();
  const wallet = useMeWallet();
  const router = useRouter();
  const address = useMemo(
    () => router.query.address as string,
    [router.query.address]
  );
  const isMe = useMemo(
    () => address === "me" || address === wallet.address,
    [address, wallet]
  );

  useEffect(() => {
    if (isMe) {
      setAddressDate(wallet);
    }
  }, [isMe, wallet]);

  // utxo
  const [utxoData, setUTXOData] = useState<UTXO>();
  const [utxoPage, setUTXOPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      if (address) {
        const _wallet = await getBalance(address);
        if (isNumber(_wallet?.balance)) {
          const _utxoData = await getUTXO(address, utxoPage);
          setAddressDate(_wallet);
          setUTXOData(_utxoData);
        }
      }
    })();
  }, [address]);
  return addressData ? (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Detail of Address {addressData?.address}
      </Typography>
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
          paddingY: 4,
        }}
      >
        <Box>
          <Typography
            component="span"
            sx={{ fontWeight: "bold", fontSize: 16, marginRight: 0.5 }}
          >
            Estimated Balance
          </Typography>
          {isMe && (
            <>
              <IconButton
                onClick={() => {
                  setIsHideBalance(!isHideBalance);
                }}
              >
                {isHideBalance ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
              <IconButton
                onClick={() => {
                  setIsOpenTransferModal(true);
                }}
              >
                <SendIcon />
              </IconButton>
            </>
          )}
        </Box>
        <Box sx={{ marginTop: 2 }} display="flex">
          {isHideBalance ? (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 20,
                lineHeight: "32px",
                color: "#1e2329",
              }}
              component={"span"}
            >
              Balance is hiding
            </Typography>
          ) : (
            <>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 24,
                  lineHeight: "32px",
                  color: "#1e2329",
                }}
                component={"span"}
              >
                {addressData.balance} UCoin
              </Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  marginLeft: 1.5,
                  fontWeight: 600,
                  lineHeight: "32px",
                  color: "#707a8a",
                }}
                component="span"
              >
                ≈ ${addressData.balance * RATE_UCOIN}
              </Typography>
            </>
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
        <Box sx={{ marginTop: 2 }}></Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
          paddingY: 4,
        }}
      >
        <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
          UTXO
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {utxoData?.txouts?.map((txOut, idx) => (
            <UTXOCollapse key={`utxo-collapse-${idx}`} txOut={txOut} />
          ))}
          <Box
            sx={{ marginTop: 1.5, paddingX: 1 }}
            display="flex"
            justifyContent="space-between"
          >
            <Typography component="span">
              Total 123 rows, 1 ~ 10 rows
            </Typography>
            <Box alignItems="center" display="flex">
              <IconButton sx={{ marginX: 1 }}>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Typography>1</Typography>

              <IconButton sx={{ marginX: 1 }}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <TransferModal
        open={isOpenTransferModal}
        onClose={() => setIsOpenTransferModal(false)}
      />
    </Layout>
  ) : (
    "Not found"
  );
}
