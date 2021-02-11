import { HistoryData } from '../services/currencyService'

type ChartDataConfig = {
  labels: string[]
  datasets: ChartDataset[]
}

type ChartDataset = {
  label: string
  data: number[]
  backgroundColor: string
}

export const setChart = (labels: string[], values: number[], translatedLabel: string): ChartDataConfig => {
  const chartBackgroundColor = 'rgba(75,192,192,0.4)'

  return {
    labels: labels,
    datasets: [
      {
        label: translatedLabel,
        data: values,
        backgroundColor: chartBackgroundColor,
      },
    ],
  }
}

export const prepareChartLabels = (dataArray: HistoryData[]): string[] => {
  return dataArray.map((historyData) => historyData.date)
}

export const prepareChartValues = (dataArray: HistoryData[]): number[] => {
  return dataArray.map((historyData) => historyData.rate)
}
