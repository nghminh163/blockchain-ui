import { Box, Grid, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMemo } from "react";
import { isMaxPage } from "../utils/pagination";

interface ITableProps {
  config: {
    title: string;
    flex: number;
    key: string;
    format?: (value: any, row?: any) => string | React.ReactNode;
    align?: string;
  }[];
  data: any[];
  pagination?: {
    total: number;
    rowPerPage: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
  };
  onClickRow?: (row: any) => void;
}

export default function Table({
  config,
  data,
  pagination,
  onClickRow = (row: any) => {},
}: ITableProps) {
  const isLastPage = useMemo(
    () =>
      pagination &&
      isMaxPage(
        pagination?.currentPage + 1,
        pagination?.total,
        pagination?.rowPerPage
      ),
    [pagination]
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
          onClick={() => onClickRow(v)}
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
                    {header?.format ? (
                      header.format(value, v)
                    ) : (
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "#474d57",
                        }}
                      >
                        {value}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
      {pagination && (
        <Box
          sx={{ marginTop: 1.5, paddingX: 1 }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography component="span">
            Total {pagination?.total} rows,{" "}
            {pagination?.rowPerPage * pagination?.currentPage + 1} ~{" "}
            {pagination?.rowPerPage * pagination?.currentPage +
              (isLastPage ? data.length || 0 : pagination?.rowPerPage)}{" "}
            rows
          </Typography>
          <Box alignItems="center" display="flex">
            <IconButton
              sx={{ marginX: 1 }}
              onClick={() => {
                pagination?.handlePageChange(pagination?.currentPage - 1);
              }}
              disabled={pagination?.currentPage === 0}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography>{pagination?.currentPage + 1}</Typography>

            <IconButton
              sx={{ marginX: 1 }}
              onClick={() => {
                pagination?.handlePageChange(pagination?.currentPage + 1);
              }}
              disabled={isLastPage}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
}
