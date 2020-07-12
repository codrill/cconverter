import {Select} from 'antd'
import React from 'react'
import {ApiRate} from "../Dashboard";

const {Option} = Select;

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
      optionFilterProp="children"
      onChange={props.onChange}
      filterOption={(input, option) => {
        return (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
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
