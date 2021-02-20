import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import { CalendarOutlined } from '@ant-design/icons/lib'
import { useTranslation } from 'react-i18next'

import { useFetchHistoryData } from '../../services/currencyService'
import { Chart } from '../chart/chart'
import { ChartDataConfig, prepareChartLabels, prepareChartValues, setChart } from '../../utils/chart'
import { CurrencyHistoryData } from '../dashboard/dashboard'

import styles from './exchangeRateHistory.module.scss'

const MAX_DATA_ARRAY_LENGTH = 90
const THIRTY_DAYS_PERIOD = { key: 'OneMonth', value: 60 }
const SIXTY_DAYS_PERIOD = { key: 'TwoMonths', value: 30 }
const NINETY_DAYS_PERIOD = { key: 'ThreeMonths', value: 0 }

type Props = {
  selectedCurrencies: CurrencyHistoryData[]
  backToDashboard: (par1: boolean, par2: boolean) => void
}

export const ExchangeRateHistoryComponent: React.FC<Props> = ({ selectedCurrencies, backToDashboard }) => {
  const { t } = useTranslation()

  const [period, setPeriod] = useState<number>(THIRTY_DAYS_PERIOD.value)
  const [chartData, setChartData] = useState<ChartDataConfig | null>(null)

  const { data, loading } = GetHistoricalData(selectedCurrencies)

  const generateButton = () => {
    const allButtons = [THIRTY_DAYS_PERIOD, SIXTY_DAYS_PERIOD, NINETY_DAYS_PERIOD]
    const setActiveClass = (activePeriod: number) => {
      return activePeriod === period ? styles.active : ''
    }

    return allButtons.map(({ key, value }) => {
      return (
        <Button
          className={`${styles.monthButton} ${setActiveClass(value)}`}
          type="primary"
          shape="round"
          icon={<CalendarOutlined />}
          key={key}
          onClick={() => {
            setPeriod(value)
          }}
        >
          {t(key)}
        </Button>
      )
    })
  }

  useEffect(() => {
    if (data) {
      const values = prepareChartValues(data.slice(period, MAX_DATA_ARRAY_LENGTH))
      const labels = prepareChartLabels(data.slice(period, MAX_DATA_ARRAY_LENGTH))
      setChartData(setChart(labels, values, t('ExchangeRate')))
    }
  }, [data, t, period])

  return (
    <div className={styles.historyRate}>
      <Spin spinning={loading}>
        {!loading && <Chart chartData={chartData as ChartDataConfig} />}

        <div className={styles.periodButtons}>{generateButton()}</div>
      </Spin>

      <div className={styles.backToDashboard}>
        <Button type="primary" className="btn-chart cc-btn--gradient" onClick={() => backToDashboard(true, false)}>
          {t('Back')}
        </Button>
      </div>
    </div>
  )
}

const GetHistoricalData = (selectedCurrencies: CurrencyHistoryData[]) => {
  const { data, loading } = useFetchHistoryData(selectedCurrencies)
  return { data, loading }
}
