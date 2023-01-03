import { useEffect, useState } from "react";
import moment from "moment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Block from "../../types/block";
import { getBlocks } from "../../api/blocks";
import { useRouter } from "next/router";
interface Column {
  id: "height" | "hash" | "miner" | "nonce" | "timestamp" | "tx_count";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "height",
    label: "Height",
    format: (value: number) => `#${value}`,
  },
  {
    id: "hash",
    label: "Hash",
  },
  {
    id: "miner",
    label: "Miner",
  },
  {
    id: "nonce",
    label: "Nonce",
  },
  {
    id: "timestamp",
    label: "Timestamp",
    format: (value: number) => moment.unix(value).format("DD/MM/YYYY HH:mm:ss"),
  },
  {
    id: "tx_count",
    label: "Tx Count",
  },
];

export default function BlockListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = useState<Block[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    (async () => {
      const blocks = await getBlocks(page + 1, rowsPerPage);
      setData(blocks.blocks);
      setTotal(blocks.total);
    })();
  }, [page, rowsPerPage]);
  const router = useRouter();
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.hash}
                  onClick={() => {
                    router.push(`/blocks/${row.height}`);
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
