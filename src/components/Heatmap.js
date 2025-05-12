// components/Heatmap.js
import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@mui/material";
import { calculateAverage, calculateStandardDeviation } from "../utils/stats";

export default function Heatmap({ data, correlationMatrix, tickers }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {tickers.map((ticker) => {
            const avg = calculateAverage(data[ticker]);
            const sd = calculateStandardDeviation(data[ticker], avg);
            return (
              <Tooltip key={ticker} title={`Avg: ${avg.toFixed(2)}, SD: ${sd.toFixed(2)}`}>
                <TableCell>{ticker}</TableCell>
              </Tooltip>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {tickers.map((ticker, rowIndex) => {
          const avg = calculateAverage(data[ticker]);
          const sd = calculateStandardDeviation(data[ticker], avg);
          return (
            <TableRow key={ticker}>
              <Tooltip title={`Avg: ${avg.toFixed(2)}, SD: ${sd.toFixed(2)}`}>
                <TableCell>{ticker}</TableCell>
              </Tooltip>
              {tickers.map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  style={{
                    background: `rgba(63,81,181,${Math.abs(
                      correlationMatrix[rowIndex][colIndex]
                    )})`,
                    color: "white",
                  }}
                >
                  {correlationMatrix[rowIndex][colIndex]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
