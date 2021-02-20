import React from 'react'
import { Line } from 'react-chartjs-2'

import { ChartDataConfig } from '../../utils/chart'
import { defaultChartColors } from '../../constants/chart'

import './chart.scss'

type Props = {
  chartData: ChartDataConfig
  bgColors?: string[]
}

export const Chart: React.FC<Props> = ({ chartData, bgColors = defaultChartColors }) => {
  const data = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const gradient = ctx.createLinearGradient(0, 500, 0, 0)

    bgColors.forEach((colorHex, index) => {
      const currentColorOffset = index / (bgColors.length - 1) // start = 0; end = 1
      return gradient.addColorStop(currentColorOffset, colorHex)
    })

    chartData.datasets[0].backgroundColor = gradient

    return {
      ...chartData,
    }
  }

  return (
    <div className="chart-container">
      <div className="line-chart">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              onClick: null,
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  )
}
