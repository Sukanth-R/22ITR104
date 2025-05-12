import React, { useEffect, useState } from "react";
import { getStocks, getStockHistory } from "../services/api";
import { Box, Typography, TextField, CircularProgress } from "@mui/material";
import { pearsonCorrelation } from "../utils/stats";
import Heatmap from "../components/Heatmap";
import Legend from "../components/Legend";

export default function CorrelationPage() {
  const [stocks, setStocks] = useState({});
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStocks().then((res) => setStocks(res.stocks));
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const newData = {};
      const entries = Object.entries(stocks);
      for (let [_, ticker] of entries) {
        const res = await getStockHistory(ticker, minutes);
        newData[ticker] = res;
      }
      setData(newData);
      setLoading(false);
    }
    if (Object.keys(stocks).length) fetchData();
  }, [stocks, minutes]);

  const tickers = Object.values(stocks);
  const correlationMatrix = tickers.map((t1) =>
    tickers.map((t2) => {
      if (!data[t1] || !data[t2]) return "-";
      if (t1 === t2) return 1;
      try {
        return pearsonCorrelation(data[t1], data[t2]).toFixed(2);
      } catch {
        return "-";
      }
    })
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Correlation Heatmap
      </Typography>
      <TextField
        type="number"
        label="Minutes"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Heatmap data={data} correlationMatrix={correlationMatrix} tickers={tickers} />
          <Legend />
        </>
      )}
    </Box>
  );
}
