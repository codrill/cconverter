import { HistoryData } from '../services/currencyService'

export type ChartDataConfig = {
  labels: string[]
  datasets: ChartDataset[]
}

type ChartDataset = {
  label: string
  data: number[]
  backgroundColor?: string | CanvasGradient
}

export const setChart = (labels: string[], values: number[], translatedLabel: string): ChartDataConfig => {
  return {
    labels: labels,
    datasets: [
      {
        label: translatedLabel,
        data: values,
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
