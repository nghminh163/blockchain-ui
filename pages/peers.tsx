import { useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Block from "../types/block";
import { getPeers } from "../api/node";
import { useRouter } from "next/router";
import { PeerResponse } from "../types/node";

const tableConfig = [
  {
    title: "Host",
    key: "host",
    flex: 4,
  },
  {
    title: "Port",
    key: "port",
    flex: 4,
  },
  {
    title: "Is Active",
    key: "is_active",
    flex: 4,
    format: (value: boolean) => (
      <Chip
        label={value ? "Active" : "Inactive"}
        color={value ? "primary" : "error"}
      />
    ),
  },
];

const ROW_PER_PAGE = 10;

export default function PeerPage() {
  const [data, setData] = useState<PeerResponse>();
  const [page, setPage] = useState(0);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    (async () => {
      const peers = await getPeers(page + 1, ROW_PER_PAGE);
      setData(peers);
    })();
  }, [page]);
  const router = useRouter();
  return data ? (
    <Layout>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Peers
      </Typography>
      <Table
        pagination={{
          total: data?.total || 0,
          rowPerPage: ROW_PER_PAGE,
          currentPage: page,
          handlePageChange,
        }}
        config={tableConfig}
        data={data.peers}
        onClickRow={(row: Block) => {}}
      />
    </Layout>
  ) : (
    ""
  );
}
