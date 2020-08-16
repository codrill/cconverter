import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { useFetchHistoryData } from "../../services/CurrencyService";
import { CurrencyHistoryData } from "../../App";
import { ChartComponent } from "../ChartComponent/ChartComponent";
import { prepareChartLabels, prepareChartValues, setChart } from "../../utils/chart";
import { CalendarOutlined } from "@ant-design/icons/lib";
import "./ExchangeRateHistoryComponent.scss"
import { useTranslation } from "react-i18next";

const MAX_DATA_ARRAY_LENGTH = 90
const THIRTY_DAYS_PERIOD = 60
const SIXTY_DAYS_PERIOD = 30
const NINETY_DAYS_PERIOD = 0

type Props = {
    selectedCurrencies: CurrencyHistoryData[]
    backToDashboard: Function
}

export const History: React.FC<Props> = ({selectedCurrencies, backToDashboard}) => {

    const {t} = useTranslation();

    const [period, setPeriod] = useState<number>(THIRTY_DAYS_PERIOD);
    let {data, loading} = GetHistoricalData(selectedCurrencies)

    const [chartData, setChartData] = useState<any>({})

    useEffect(() => {
        if (data) {
            const values = prepareChartValues(data.slice(period, MAX_DATA_ARRAY_LENGTH))
            const labels = prepareChartLabels(data.slice(period, MAX_DATA_ARRAY_LENGTH))
            setChartData(setChart(labels, values, t('ExchangeRate')));
        }
    }, [data, t, period])

    return (
        <div>
            {!loading ?
                <div className="history-rate-container">
                    <ChartComponent chartData={chartData}/>

                    <div className="periodButtons">
                        <Button className="monthButton" type="primary" shape="round" icon={<CalendarOutlined/>}
                                onClick={() => setPeriod(THIRTY_DAYS_PERIOD)}>
                            {t('OneMonth')} </Button>

                        <Button className="monthButton" type="primary" shape="round" icon={<CalendarOutlined/>}
                                onClick={() => setPeriod(SIXTY_DAYS_PERIOD)}>
                            {t('TwoMonths')}</Button>

                        <Button className="monthButton" type="primary" shape="round" icon={<CalendarOutlined/>}
                                onClick={() => setPeriod(NINETY_DAYS_PERIOD)}>
                            {t('ThreeMonths')}
                        </Button>

                    </div>

                    <div className="backToDashboard">
                        <Button type="primary"
                                className="btn-chart cc-btn--gradient"
                                onClick={() => backToDashboard(true, false)}>
                            {t('Back')}
                        </Button>
                    </div>
                </div>
                : <Spin/>
            }
        </div>
    )
}

const GetHistoricalData = (selectedCurrencies: CurrencyHistoryData[]) => {
    const {data, loading} = useFetchHistoryData(selectedCurrencies)
    return {data, loading}
}
