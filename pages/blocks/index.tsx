import { Typography } from "@mui/material";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import Block from "../../types/block";
import { getBlocks } from "../../api/blocks";
import moment from "moment";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
const socket = io(URL_SERVER);

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

export default function BlockListPage({
  blocks,
  page,
}: {
  blocks: {
    blocks: Block[];
    total: number;
  };
  page: number;
}) {
  const [blockData, setBlockData] = useState(blocks);
  const router = useRouter();
  const alert = useAlert();
  const handlePageChange = (page: number) => {
    router.push(`/blocks?page=${page}`);
  };
  useEffect(() => {
    socket.on("block", async () => {
      const _blockData = await getBlocks(page + 1, ROW_PER_PAGE);
      alert.success("New block added");
      setBlockData(_blockData);
    });

    return () => {
      socket.off("block");
    };
  }, []);
  return blockData ? (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Blocks
      </Typography>
      <Table
        pagination={{
          total: blockData?.total,
          rowPerPage: ROW_PER_PAGE,
          currentPage: page,
          handlePageChange,
        }}
        config={tableConfig}
        data={blockData?.blocks}
        onClickRow={(row: Block) => {
          router.push(`/blocks/${row.height}`);
        }}
      />
    </Layout>
  ) : (
    ""
  );
}

export async function getServerSideProps({
  query: { page = 0 },
}: {
  query: { page: number | string };
}) {
  try {
    const _page = parseInt(page as string);
    const blocks = await getBlocks(_page + 1, ROW_PER_PAGE);
    return { props: { blocks, page: _page } };
  } catch (e) {}
}
