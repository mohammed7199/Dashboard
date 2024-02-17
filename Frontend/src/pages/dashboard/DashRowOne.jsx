import React, { useEffect, useMemo, useState } from "react";
import { useGetKpisQuery } from "../../state/API";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DashBox from "../../components/DashBox";

const DashRowOne = () => {
  const { data, isLoading, isError } = useGetKpisQuery();
  console.log('FBdata->', data)
  console.log('FBisError:', isError);
  const [revenueExpenses, setRevenueExpenses] = useState([]);
  const [revenueProfit, setRevenueProfit] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    if (data) {
      const revenueExpensesData = data[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
        expenses: expenses,
      }));
      const revenueProfitData = data[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
        profit: (revenue - expenses).toFixed(2),
      }));
      const revenueData = data[0].monthlyData.map(({ month, revenue }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
      }));

      setRevenueExpenses(revenueExpensesData);
      setRevenueProfit(revenueProfitData);
      setRevenue(revenueData);
    }
  }, [data]);

  const options1 = useMemo(() => ({
    chart: {
      type: 'area'
    },
    title: {
      text: 'Revenue and Expenses'
    },
    xAxis: {
      categories: revenueExpenses.map(entry => entry.name),
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      },
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Amount'
      },
      labels: {
        style: {
          fontSize: '10px'
        }
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      shared: true,
      valueSuffix: ' units'
    },
    series: [{
      name: 'Revenue',
      data: revenueExpenses.map(entry => entry.revenue)
    }, {
      name: 'Expenses',
      data: revenueExpenses.map(entry => entry.expenses)
    }]
  }), [revenueExpenses]);

  const options2 = useMemo(() => ({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Profit and Revenue'
    },
    xAxis: {
      categories: revenueProfit.map(entry => entry.name),
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      },
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    },
    yAxis: [{
      title: {
        text: 'Profit',
      },
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    }, {
      title: {
        text: 'Revenue',
      },
      opposite: true,
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    }],
    tooltip: {
      shared: true
    },
    series: [{
      name: 'Profit',
      data: revenueProfit.map(entry => parseFloat(entry.profit))
    }, {
      name: 'Revenue',
      data: revenueProfit.map(entry => entry.revenue)
    }]
  }), [revenueProfit]);

  const options3 = useMemo(() => ({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Revenue Month by Month'
    },
    xAxis: {
      categories: revenue.map(entry => entry.name),
      title: {
        text: null
      },
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue',
        align: 'high'
      },
      labels: {
        overflow: 'justify',
        style: {
          fontSize: '10px'
        }
      }
    },
    tooltip: {
      valueSuffix: ' units'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Revenue',
      data: revenue.map(entry => entry.revenue)
    }]
  }), [revenue]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <>
      <DashBox gridArea="a">
        <HighchartsReact highcharts={Highcharts} options={options1} containerProps={{ style: { height: '313px', padding: '7px' } }} />
      </DashBox>
      <DashBox gridArea="b">
        <HighchartsReact highcharts={Highcharts} options={options2} containerProps={{ style: { height: '313px', padding: '7px' } }} />
      </DashBox>
      <DashBox gridArea="c">
        <HighchartsReact highcharts={Highcharts} options={options3} containerProps={{ style: { height: '229px', padding: '7px' } }} />
      </DashBox>
    </>
  );
};

export default DashRowOne;