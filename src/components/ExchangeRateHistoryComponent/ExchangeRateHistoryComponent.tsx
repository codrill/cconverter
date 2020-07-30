import React, { useEffect, useState } from "react";
import { menuRoutes } from "../../config/routes";
import { Link } from "react-router-dom";
import { Button, Spin } from "antd";
import { useFetchHistoryData } from "../../services/CurrencyService";
import { CurrencyHistoryData } from "../../App";
import { ChartComponent } from "../ChartComponent/ChartComponent";
import { prepareChartLabels, prepareChartValues, setChart } from "../../utils/chart";
import { CalendarOutlined } from "@ant-design/icons/lib";
import "./ExchangeRateHistoryComponent.scss"
import { useTranslation } from "react-i18next";

type Props = {
    selectedCurrencies: CurrencyHistoryData[]
}

export const History: React.FC<Props> = ({selectedCurrencies}) => {

    const {t} = useTranslation();

    const [period, setPeriod] = useState<number>(30);
    const {data, loading} = GetHistoricalData(selectedCurrencies, period)

    const [chartData, setChartData] = useState<any>({})

    useEffect(() => {
        if (data) {
            prepareHistoryRateChartData()
        }
    }, [data, t])

    const prepareHistoryRateChartData = () => {
        const values = prepareChartValues(data)
        const labels = prepareChartLabels(data)
        setChartData(setChart(labels, values, t('ExchangeRate')));
    }

    return (
        <div>
            {!loading ?
                <div className="history-rate-container">
                    <ChartComponent chartData={chartData}/>

                    <div className="periodButtons">
                        <Button className="monthButton" type="primary" shape="round" icon={<CalendarOutlined/>} onClick={() => setPeriod(30)}>
                            {t('OneMonth')} </Button>

                        <Button className="monthButton" type="primary" shape="round" icon={<CalendarOutlined/>} onClick={() => setPeriod(60)}>
                            {t('TwoMonths')}</Button>

                        <Button className="monthButton" type="primary" shape="round" icon={<CalendarOutlined/>} onClick={() => setPeriod(90)}>
                            {t('ThreeMonths')}
                        </Button>

                    </div>

                    <div className="backToDashboard">
                        <Button type="primary"
                                className="btn-chart cc-btn--gradient">

                            <Link to={menuRoutes.home().path}>
                                {t('Back')}
                            </Link>
                        </Button>
                    </div>
                </div>
                : <Spin/>
            }
        </div>
    )
}

const GetHistoricalData = (selectedCurrencies: any, period: number) => {
    const {data, loading} = useFetchHistoryData(selectedCurrencies, period)
    return {data, loading};
}
