'use client'
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

// Example data
const data = [
  { name: "Day 1", value: 1000 },
  { name: "Day 2", value: 1500 },
  { name: "Day 3", value: 1200 },
  { name: "Day 4", value: 1800 },
  { name: "Day 5", value: 2200 },
  { name: "Day 6", value: 2600 },
  { name: "Day 7", value: 3000 },
];

export default function PortfolioChart() {
  return (
    <Card sx={{ bgcolor: "black", color: "white", borderRadius: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          $18,355.10
        </Typography>
        <Typography variant="body2" sx={{ color: "limegreen" }}>
          +$1,428.17 (+8.43%) all time →
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#00FF00" stopOpacity={0.8} />
                <stop offset="90%" stopColor="#00FF00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "lime" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00FF00"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
