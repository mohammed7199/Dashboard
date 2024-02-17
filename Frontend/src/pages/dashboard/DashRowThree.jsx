import BoxHeader from "../../components/BoxHeader";
import DashBox from "../../components/DashBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "../../state/API";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);


const DashRowThree = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData && kpiData.length > 0) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => ({
        name: key,
        y: value,
        color: pieColors[0], // You can customize colors here
        drilldown: {
          name: key,
          data: [[`${key} of Total`, totalExpenses - value]], // Subcategory data
        },
      }));
    } else {
      return [];
    }
  }, [kpiData, pieColors]);
  

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params) =>
        (params.value).length,
    },
  ];

  const barOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },
    },
    title: {
      text: 'Expense',
      align: 'left',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    xAxis: {
      type: 'category',
      categories: ['Category 1', 'Category 2', 'Category 3'], // Example categories
    },
    yAxis: {
      title: {
        text: 'Expense',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '130%'],
        size: '270%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Browser share',
      innerSize: '50%',
      data: [
        ['Electronics', 73.86],
        ['Household', 11.97],
        ['Clothing', 5.52],
        ['Books', 2.98],
        ['Sports', 1.90],
        ['Other', 3.77]
      ]
    }]
  };

  const arcOptions = {
    chart: {
        type: 'packedbubble',
        height: '34%'
    },
    title: {
        text: 'PRODUCTS',
        align: 'left'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
    },
    plotOptions: {
        packedbubble: {
            minSize: '260%',
            maxSize: '360%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'small',
                }
            }
        }
    },
    series: [
      {
          name: 'Electronics',
          data: [
              { name: 'Smartphone', value: 699 },
              { name: 'Laptop', value: 1299 },
              { name: 'Tablet', value: 399 },
              { name: 'Smartwatch', value: 249 },
              { name: 'Headphones', value: 149 },
              { name: 'Camera', value: 799 },
              { name: 'Gaming Console', value: 499 },
              { name: 'Wireless Speaker', value: 179 },
          ]
      },
      {
          name: 'Clothing',
          data: [
              { name: 'T-shirt', value: 19.99 },
              { name: 'Jeans', value: 59.99 },
              { name: 'Dress', value: 79.99 },
              { name: 'Sneakers', value: 89.99 },
              { name: 'Jacket', value: 129.99 },
              { name: 'Hoodie', value: 49.99 },
          ]
      },
      {
          name: 'Home & Kitchen',
          data: [
              { name: 'Coffee Maker', value: 129 },
              { name: 'Blender', value: 79 },
              { name: 'Cookware Set', value: 199 },
              { name: 'Vacuum Cleaner', value: 299 },
              { name: 'Toaster', value: 39 },
              { name: 'Air Fryer', value: 89 },
          ]
      },
  ]  
};


  return (
    <>
      <DashBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
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
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashBox>
      <DashBox gridArea="h" style={{height: '250px', marginTop: '75px'}}>
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
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
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashBox>
      <DashBox gridArea="i">
          <HighchartsReact highcharts={Highcharts} options={barOptions} containerProps={{ style: { height: '145px', padding: '7px' } }} />
      </DashBox>
      <DashBox gridArea="j" style={{height: '160px', marginTop: '-8px'}}>
      <HighchartsReact highcharts={Highcharts} options={arcOptions} containerProps={{ style: { height: '160px', padding: '7px' } }} />
      </DashBox>
    </>
  );
};

export default DashRowThree;
