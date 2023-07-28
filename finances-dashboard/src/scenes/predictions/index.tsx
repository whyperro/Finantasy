import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { useTheme, Box, Typography, Button } from "@mui/material";
import { useState, useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredicted, setIsPredicted] = useState<boolean>(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];

    const monthData = kpiData[0].monthlyData;
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Ingreso Real": revenue,
        "Linea de Regresion": regressionLine.predict(i)[1],
        "Ingreso Predicho": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1erm 2.5rem">
        <Box>
          <Typography variant="h3">Ingresos y Predicciones</Typography>
          <Typography variant="h6">
            Grafica de ingresos e ingresos futuros dado un modelo de regresion
            lineal
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredicted(!isPredicted)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1re 0.1rem rgba(0, 0, 0, .4)",
            "&:hover": {
              backgroundColor: palette.grey[600],
            },
          }}
        >
          Mostrar Prediccion de Ingresos
        </Button>
      </FlexBetween>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Meses" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value="Ingresos en USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Ingreso Real"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Linea de Regresion"
            stroke="#8884d8"
            dot={false}
          />
          {isPredicted && (
            <Line
              type="monotone"
              dataKey="Ingreso Predicho"
              stroke={palette.secondary[200]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
