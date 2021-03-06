import React, { useState } from 'react'
import { Select } from 'antd'

import { ApiRate } from '../dashboard/dashboard'

const { Option } = Select

type Props = {
  value: string
  name: string
  onChange: (value: string) => void
  currencyRates: ApiRate[]
  disabled: boolean
}

type FilterOption = {
  props: {
    children: string
  }
}

export const CurrencySelect: React.FC<Props> = (props) => {
  const { value, name, onChange, currencyRates, disabled } = props

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)

  return (
    <>
      <label htmlFor={name} className="sr-only">
        {name}
      </label>
      <Select
        showSearch
        value={value}
        placeholder="Select currency"
        id={name}
        size="large"
        optionFilterProp="children"
        aria-expanded={dropdownVisible}
        onDropdownVisibleChange={(open) => setDropdownVisible(open)}
        onChange={onChange}
        disabled={disabled}
        filterOption={(inputValue: string, option: FilterOption) => {
          return (option?.props.children).toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }}
      >
        {renderOptionsInSelector(currencyRates)}
      </Select>
    </>
  )
}

const renderOptionsInSelector = (rates: ApiRate[]) => {
  return rates.map((rate) => {
    return (
      <Option value={rate.code} key={rate.code}>
        {rate.currency}
      </Option>
    )
  })
}
