// components/Legend.js
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Legend() {
  return (
    <Box mt={2}>
      <Typography variant="subtitle2">
        Heatmap Legend: Darker = Stronger Correlation
      </Typography>
    </Box>
  );
}
