import React, { useEffect, useState } from "react";
import { getStocks, getStockHistory } from "../services/api";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import StockChart from "../components/StockChart";

export default function StockPage() {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStocks().then((res) => setStocks(res.stocks));
  }, []);

  useEffect(() => {
    setLoading(true);
    getStockHistory(selectedStock, minutes).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [selectedStock, minutes]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stock Price Chart
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Stock</InputLabel>
        <Select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
          {Object.entries(stocks).map(([name, ticker]) => (
            <MenuItem key={ticker} value={ticker}>{`${name} (${ticker})`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Minutes</InputLabel>
        <Select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
          {[5, 10, 30, 60].map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading ? <CircularProgress /> : <StockChart data={data} />}
    </Box>
  );
}