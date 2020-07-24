import React from "react";
import { menuRoutes } from "../../config/routes";
import { Link } from "react-router-dom";
import { Button, Spin } from "antd";
import { useFetchHistoryData } from "../../services/CurrencyService";
import { CurrencyHistoryData } from "../../App";

type Props = {
    selectedCurrencies: CurrencyHistoryData[]
}

export const History: React.FC<Props> = ({selectedCurrencies}) => {

    const {data, loading} = GetHistoricalData(selectedCurrencies, 10)

    return (
        <div>
            {!loading ?
                <div>
                    {data.map((element) => {
                        return <div key={element.rate}>{element.rate}</div>
                    })}
                    <div className="backToDashboard">
                        <Button type="primary"
                                className="btn-chart cc-btn--gradient">

                            <Link to={menuRoutes.home().path}>
                                Move to dashboard
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
    debugger
    const {data, loading} = useFetchHistoryData(selectedCurrencies, period)
    return {data, loading};
}

