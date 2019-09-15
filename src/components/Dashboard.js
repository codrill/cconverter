import {Input, Select} from "antd";
import 'antd/dist/antd.css';
import './Dashboard.css'
import React, {useEffect, useState} from "react";
import {getCurrencyValues} from "../services/CurrencyService";

const {Option} = Select;

export const Dashboard = () => {

  const [apiRates, setApiRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [userValue, setUserValue] = useState(0);
  const [converterValue, setConvertedValue] = useState(0);
  const [date, setCurrentDate] = useState('');

    useEffect(() => {
      getCurrencyValues().then(array => {
        setApiRates(array[0].rates);
        setCurrentDate(array[0].effectiveDate);
      })
    }, []);


    useEffect(() => {
      const firstValue = apiRates.find(rate => rate.code === fromCurrency);
      const secondValue = apiRates.find(rate => rate.code === toCurrency);

      if (firstValue && secondValue) {
        const result = firstValue.bid / secondValue.bid;

        setConvertedValue((userValue * result).toFixed(2).toString());
      }});

    return (
      <div className="converter-container">
        <div className="selector-wrapper">

          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select currency"
            optionFilterProp="children"
            onChange={setFromCurrency}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {renderOptionsInSelector(apiRates)}
          </Select>

          <div className="source-input">
            <Input
              value={userValue}
              onChange={(value) => setUserValue(value.target.value)}/>
          </div>

          <div className="destination-input">
            <Input
              value={converterValue}/>
          </div>

          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select currency"
            optionFilterProp="children"
            onChange={setToCurrency}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {renderOptionsInSelector(apiRates)}
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