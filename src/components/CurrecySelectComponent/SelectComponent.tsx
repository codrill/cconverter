import React from 'react'
import { Select } from 'antd'

import { ApiRate } from "../Dashboard";

const { Option } = Select;

type Props = {
  value: string
  onChange: (value: string) => void
  currencyRates: ApiRate[]
}

export function CurrencySelect(props: Props) {
  return (
    <Select
      showSearch
      value={props.value}
      placeholder="Select currency"
      size="large"
      optionFilterProp="children"
      onChange={props.onChange}
      filterOption={(inputValue, option) => {
        return (option?.props.children as string).toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
      }

      }
    >
      {renderOptionsInSelector(props.currencyRates)}
    </Select>
  )
}

const renderOptionsInSelector = (rates: ApiRate[]) => {
  return rates.map(rate => {
    return <Option
      value={rate.code}
      key={rate.code}>{rate.currency}</Option>
  })
}
