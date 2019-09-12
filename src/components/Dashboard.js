import {Input, Select} from "antd";
import 'antd/dist/antd.css';
import './Dashboard.css'
import React, {useEffect, useState} from "react";
import {getCurrencyValues} from "../services/CurrencyService";

const {Option} = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

export const Dashboard = () => {

  const [rates, setRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [userValue, setUserValue] = useState(0);
  const [date, setCurrentDate] = useState('');

  useEffect(() => {
    getCurrencyValues().then(array => {
      setRates(array[0].rates);
      setCurrentDate(array[0].effectiveDate);
      console.log(array[0])
    })
  }, []);

  return (
    <div className="converter-container">
      <div className="selector-wrapper">

        <Select
          showSearch
          style={{width: 200}}
          placeholder="Select currency"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {renderOptionsInSelector(rates)}
        </Select>

        <div className="source-input">
          <Input/>
        </div>

        <div className="destination-input">
          <Input/>
        </div>

        <Select
          showSearch
          style={{width: 200}}
          placeholder="Select currency"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {renderOptionsInSelector(rates)}
        </Select>
      </div>

      <div className="effectiveDate">
        {displayDateInformation(date)}
      </div>
    </div>
  )
};

const renderOptionsInSelector = (rates) => {
  return rates.map(rate => {
    return <Option value={rate.code} key={rate.code}>{rate.currency}</Option>
  })
};

const displayDateInformation = (date) => {
  return (
    <h4>{date}</h4>
  )
};