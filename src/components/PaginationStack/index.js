import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded(page, onChange) {
  return (
    <Stack spacing={2}>
      <Pagination count={10} page={page} onChange={onChange} shape="rounded" />
    </Stack>
  );
}
