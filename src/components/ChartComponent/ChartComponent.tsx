import React from "react";
import { Line } from "react-chartjs-2";
import "./ChartComponent.scss"

export const ChartComponent: React.FC<any> = ({chartData}) => {

    return (
        <div className="chart-container">
            <div className="line-chart">
                <Line
                    data={chartData}
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
        </div>
    )
}
