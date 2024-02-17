import DashBox from "../../components/DashBox";
import { useGetKpisQuery, useGetProductsQuery } from "../../state/API";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import darkUnica from "highcharts/themes/dark-unica";

darkUnica(Highcharts);

const pieData = [
    { name: "ELECTRONCIS", y: 900 },
    { name: "KITCHEN", y: 600 },
    { name: "CLOTHING", y: 400 },
];

const DashRowTwo = () => {
    const { palette } = useTheme();
    const pieColors = useMemo(() => [palette.primary[800], palette.primary[300]], [palette]);
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();

    const productExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    x: price,
                    y: expense,
                };
            })
        );
    }, [productData]);

    const pieOptions = useMemo(() => ({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'SALES TARGET'
        },
        series: [{
            name: 'Sales',
            data: pieData
        }],
        colors: pieColors
    }), [pieColors]);

    const scatterOptions = useMemo(() => ({
        chart: {
            type: 'scatter'
        },
        title: {
            text: 'Product Prices vs Expenses'
        },
        xAxis: {
            title: {
                text: 'Price'
            },
            labels: {
                formatter: function () {
                    return '$' + this.value;
                }
            }
        },
        yAxis: {
            title: {
                text: 'Expense'
            },
            labels: {
                formatter: function () {
                    return '$' + this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '$' + this.x + ', $' + this.y;
            }
        },
        series: [{
            name: 'Product Expense Ratio',
            data: productExpenseData
        }],
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        }
    }), [productExpenseData]);

    const barOptions = useMemo(() => ({
        chart: {
            type: 'column',
        },
        title: {
            text: 'EXPENSE BAR'
        },
        xAxis: {
            categories: ['ELECTRONICS', 'KITCHEN', 'CLOTHING'] // Add your categories here
        },
        yAxis: {
            title: {
                text: 'PRICE'
            }
        },
        series: [{
            name: 'PRODUCTS',
            data: productExpenseData // Add your data points here
        }]
    }), [productExpenseData]);

    return (
        <>
            <DashBox gridArea="e" style={{height: '230px'}}>
                <div style={{borderRadius: '3px',  overflow: 'hidden', border: "none"}}>
                <HighchartsReact highcharts={Highcharts} options={barOptions} containerProps={{ style: { height: '230px', padding: '7px' } }}/>
                </div>
            </DashBox>
            <DashBox gridArea="d">
                <HighchartsReact highcharts={Highcharts} options={pieOptions} containerProps={{ style: { height: '230px', padding: '7px' } }}/>
            </DashBox>
            <DashBox gridArea="f">
                <HighchartsReact highcharts={Highcharts} options={scatterOptions} containerProps={{ style: { height: '230px', padding: '7px' } }}/>
            </DashBox>
        </>
    );
};

export default DashRowTwo;