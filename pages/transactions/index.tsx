import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import Block from "../../types/block";
import { getBlocks } from "../../api/blocks";
import moment from "moment";
import { useRouter } from "next/router";

const tableConfig = [
  {
    title: "Height",
    flex: 0.5,
    key: "height",
    format: (value: number | string) => `#${value}`,
  },
  {
    title: "Hash",
    flex: 5.5,
    key: "hash",
  },
  {
    title: "Miner",
    flex: 3.3,
    key: "miner",
  },
  {
    title: "Nonce",
    flex: 0.8,
    key: "nonce",
  },
  {
    title: "Timestamp",
    flex: 1.2,
    key: "timestamp",
    format: (value: number | string) =>
      moment.unix(value as number).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    title: "Tx count",
    flex: 0.5,
    key: "tx_count",
    align: "center",
  },
];

const ROW_PER_PAGE = 10;

export default function TransactionListPage() {
  const [data, setData] = useState<Block[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    (async () => {
      const blocks = await getBlocks(page + 1, ROW_PER_PAGE);
      setData(blocks.blocks);
      setTotal(blocks.total);
    })();
  }, [page]);
  const router = useRouter();
  return (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Blocks
      </Typography>
      <Table
        pagination={{
          total,
          rowPerPage: ROW_PER_PAGE,
          currentPage: page,
          handlePageChange,
        }}
        config={tableConfig}
        data={data}
        onClickRow={(row: Block) => {
          router.push(`/blocks/${row.height}`);
        }}
      />
    </Layout>
  );
}
