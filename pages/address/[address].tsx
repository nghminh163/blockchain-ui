import { Box, IconButton, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UTXOCollapse from "../../components/UTXOCollapse";
import SendIcon from "@mui/icons-material/Send";
import TransferModal from "../../components/TransferModal";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Balance, UTXO, IHistory } from "../../types/address";
import { getBalance, getHistory, getUTXO } from "../../api/address";
import { isNumber } from "lodash";
import { RATE_UCOIN, ROW_PER_PAGE } from "../../constants";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { isMaxPage } from "../../utils/pagination";
import Table from "../../components/Table";
import { shortTxString } from "../../utils/parseTxName";
import Chip from "@mui/material/Chip";
import moment from "moment";

// TODO: Add loding and 404 page

const txConfig = [
  {
    title: "Tx Hash",
    flex: 1.3,
    key: "tx_hash",
    format: (txHash: string | number) => (
      <a
        href={`/transactions/${txHash}`}
        style={{
          // visit
          color: "#000",
          textDecoration: "underline",
          // hover
        }}
      >
        {shortTxString(txHash as string)}
      </a>
    ),
  },
  {
    title: "Amount",
    flex: 1.3,
    key: "amount",
    format: (amount: string | number) => `${amount} UCoin`,
  },
  {
    title: "From",
    flex: 3,
    key: "from_addr",
    format: (from: string | number, row: any) => (
      <Chip
        label={from ? from : "Block reward"}
        variant="outlined"
        onClick={
          from
            ? () => {
                location.assign("/address/" + from);
              }
            : undefined
        }
      />
    ),
  },
  {
    title: "Type",
    flex: 1.5,
    key: "tx_type",
    format: (tx_type: string | number) => (
      <Chip
        label={tx_type === "IN" ? "Receive" : "Spend"}
        color={tx_type === "IN" ? "success" : "error"}
      />
    ),
  },
  {
    title: "To",
    flex: 3.5,
    key: "to_addr",
    format: (to: string | number, row: any) => (
      <Chip
        label={to}
        variant="outlined"
        onClick={() => {
          location.assign("/address/" + to);
        }}
      />
    ),
  },
  {
    title: "Timestamp",
    flex: 1.2,
    key: "timestamp",
    format: (value: number | string) =>
      moment.unix(value as number).format("DD/MM/YYYY HH:mm:ss"),
  },
];
export default function AddressDetail() {
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);
  const [isHideBalance, setIsHideBalance] = useState(false);
  const [addressData, setAddressData] = useState<Balance>();
  const router = useRouter();
  const address = useMemo(
    () => router.query.address as string,
    [router.query.address]
  );
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    (async () => {
      if (address && !addressData) {
        const _myWallet = await getBalance();
        if (address === "me" || address === _myWallet.address) {
          setIsMe(true);
          setAddressData(_myWallet);
        } else {
          const _wallet = await getBalance(address);
          setAddressData(_wallet);
        }
      }
    })();
  }, [address, addressData]);
  // utxo
  const [utxoData, setUTXOData] = useState<UTXO>();
  const [utxoPage, setUTXOPage] = useState<number>(1);
  useEffect(() => {
    (async () => {
      if (addressData?.address && isNumber(addressData?.balance)) {
        const _utxoData = await getUTXO(addressData?.address, utxoPage);
        setUTXOData(_utxoData);
      }
    })();
  }, [addressData, utxoPage]);

  // transaction
  const [txData, setTxData] = useState<IHistory>();
  const [pageTx, setPageTx] = useState(0);
  useEffect(() => {
    (async () => {
      if (addressData?.address && isNumber(addressData?.balance)) {
        const _txData = await getHistory(addressData?.address, pageTx + 1);
        setTxData(_txData);
      }
    })();
  }, [addressData, pageTx]);

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
                {addressData.balance || 0} UCoin
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
        <Box sx={{ marginTop: 2 }}>
          {txData && (
            <Table
              config={txConfig}
              data={txData.history}
              pagination={{
                currentPage: pageTx,
                handlePageChange: (page) => {
                  setPageTx(page);
                },
                rowPerPage: ROW_PER_PAGE,
                total: txData.total,
              }}
            />
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
              Total {utxoData?.total} rows, {ROW_PER_PAGE * (utxoPage - 1) + 1}{" "}
              ~{" "}
              {ROW_PER_PAGE * (utxoPage - 1) +
                (isMaxPage(utxoPage, utxoData?.total)
                  ? utxoData?.txouts?.length || 0
                  : 10)}{" "}
              rows
            </Typography>
            <Box alignItems="center" display="flex">
              <IconButton
                disabled={utxoPage === 1}
                sx={{ marginX: 1 }}
                onClick={() => setUTXOPage(utxoPage - 1)}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Typography>{utxoPage}</Typography>

              <IconButton
                sx={{ marginX: 1 }}
                disabled={isMaxPage(utxoPage, utxoData?.total)}
                onClick={() => setUTXOPage(utxoPage + 1)}
              >
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
    ""
  );
}
