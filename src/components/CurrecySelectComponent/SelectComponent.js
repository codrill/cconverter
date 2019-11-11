import {Select} from 'antd'
import React from 'react'

const {Option} = Select

export function CurrencySelect(props) {
  return (
      <Select
          showSearch
          value={props.value}
          style={{width: 200}}
          placeholder="Select currency"
          optionFilterProp="children"
          onChange={props.onChange}
          filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
      >
        {renderOptionsInSelector(props.currencyRates)}
      </Select>
  )
}

const renderOptionsInSelector = (rates) => {
  return rates.map(rate => {
    return <Option
        value={rate.code}
        key={rate.code}>{rate.currency}</Option>
  })
}
