import React, {useState} from 'react'
import { Select } from 'antd'

import { ApiRate } from "../Dashboard/Dashboard";

const { Option } = Select;

type Props = {
  value: string
  name: string
  onChange: (value: string) => void
  currencyRates: ApiRate[]
  disabled: boolean
}

export function CurrencySelect(props: Props) {
  const { value, name, onChange, currencyRates, disabled } = props

  const [ dropdownVisible, setDropdownVisible ] = useState<boolean>(false)

  return (
    <>
      <label htmlFor={name} className="sr-only">{name}</label>
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
        filterOption={(inputValue, option) => {
          return (option?.props.children as string).toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        }

        }
      >
        {renderOptionsInSelector(currencyRates)}
      </Select>
    </>
  )
}

const renderOptionsInSelector = (rates: ApiRate[]) => {
  return rates.map(rate => {
    return <Option
      value={rate.code}
      key={rate.code}>{rate.currency}</Option>
  })
}
