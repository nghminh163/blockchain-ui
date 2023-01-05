import { Box, Grid, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMemo } from "react";

interface ITableProps {
  config: {
    title: string;
    flex: number;
    key: string;
    format?: (value: number) => string;
    align?: string;
  }[];
  data: any[];
  total: number;
  rowPerPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export default function Table({
  config,
  data,
  total,
  rowPerPage,
  currentPage,
  handlePageChange,
}: ITableProps) {
  const isLastPage = useMemo(
    () => currentPage + 1 === Math.round(total / rowPerPage),
    [currentPage, rowPerPage, total]
  );
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: "#f5f5f5;",
          height: 40,
        }}
        paddingX={1}
      >
        <Grid container>
          {config.map((header, i) => (
            <Grid
              item
              xs={header.flex}
              key={`table-header-${i}`}
              display="flex"
              sx={{
                justifyContent: header.align || "left",
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#707a8a",
                  }}
                >
                  {header.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {data.map((v, i) => (
        <Box
          display="flex"
          alignItems="center"
          sx={{
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
          paddingX={1}
          key={`table-row-${i}`}
        >
          <Grid container>
            {config.map((header, j) => {
              const value = v[header.key];
              return (
                <Grid
                  item
                  xs={header.flex}
                  key={`table-row-${i}-cell-${j}`}
                  display="flex"
                  sx={{
                    height: 64,
                    borderBottom: "1px solid #f5f5f5",
                    justifyContent: header.align || "left",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#474d57",
                      }}
                    >
                      {header?.format && typeof value === "number"
                        ? header.format(value)
                        : value}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
      <Box
        sx={{ marginTop: 1.5, paddingX: 1 }}
        display="flex"
        justifyContent="space-between"
      >
        <Typography component="span">
          Total {total} rows, {rowPerPage * currentPage + 1} ~{" "}
          {rowPerPage * currentPage + 10} rows
        </Typography>
        <Box alignItems="center" display="flex">
          <IconButton
            sx={{ marginX: 1 }}
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage === 0}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography>{currentPage + 1}</Typography>

          <IconButton
            sx={{ marginX: 1 }}
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
            disabled={isLastPage}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
