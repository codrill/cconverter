import React from "react";
import { Line } from "react-chartjs-2";
import { Spin } from "antd";
import "./ChartComponent.scss"

export const ChartComponent: React.FC<any> = (chartData) => {

    return (
        <div className="chart-container">
            {!!chartData ?
                <div className="line-chart">
                    <Line
                        data={chartData.chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }
                                ]
                            }
                        }
                        }
                    />
                </div>
                : <Spin/>
            }
        </div>
    )
}
