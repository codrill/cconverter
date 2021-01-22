import { HistoryData } from '../services/currencyService'

export function setChart(labels: string[], values: number[], translatedLabel: string) {
  return {
    labels: labels,
    datasets: [
      {
        label: translatedLabel,
        data: values,
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  }
}

export function prepareChartLabels(dataArray: HistoryData[]) {
  return dataArray.map((historyData) => {
    return historyData.date
  })
}

export function prepareChartValues(dataArray: HistoryData[]) {
  return dataArray.map((historyData) => {
    return historyData.rate
  })
}
