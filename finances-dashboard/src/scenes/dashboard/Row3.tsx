import DashboardBox from "@/components/DashboardBox";
import { useMemo } from "react";
import FlexBetween from "@/components/FlexBetween";
import HeaderBox from "@/components/HeaderBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { useTheme, Box, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { GridCellParams } from "@mui/x-data-grid";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: transactionData } = useGetTransactionsQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: kpiData } = useGetKpisQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const productsColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Gastos",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionsColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Comprador",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Monto",
      flex: 0.6,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Cantidad",
      flex: 0.4,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <HeaderBox
          title="Lista de Productos"
          sidetext={`${productData?.length} productos`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeperator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={23}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productsColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <HeaderBox
          title="Lista de Productos"
          sidetext={`${transactionData?.length} productos`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeperator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={23}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionsColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <HeaderBox title="Gastos por Categoria" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h6">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <HeaderBox title="Resumen y Explicacion de los Datos" sidetext="15%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos fugiat
          qui perspiciatis necessitatibus nam, consequatur quisquam illum! Ea
          nisi molestiae dolorum consequatur earum unde necessitatibus
          perspiciatis veritatis, nihil animi blanditiis?
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
