import {Input, Select} from "antd";
import 'antd/dist/antd.css';
import './Dashboard.css'
import React, {useState} from "react";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

export function Dashboard() {

  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [userValue, setUserValue] = useState(0);


    return (
      <div className="converter-container">
        <div className="selector-wrapper">

          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>


          <div className="source-input">
            <Input/>
          </div>

          <div className="destination-input">
            <Input/>
          </div>
        </div>
      </div>
    )
}