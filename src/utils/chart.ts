import { HistoryData } from "../services/CurrencyService";

export function setChart(labels: string[], values: number[], translatedLabel: string) {
    return {
        labels: labels,
        datasets: [{
            label: translatedLabel,
            data: values,
            backgroundColor: 'rgba(75,192,192,0.4)',
        }],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
}

export function prepareChartLabels(dataArray: HistoryData[]) {
    return dataArray.map(historyData => {
        return historyData.date;
    });
}

export function prepareChartValues(dataArray: HistoryData[]) {
    return dataArray.map(historyData => {
        return historyData.rate
    });
}