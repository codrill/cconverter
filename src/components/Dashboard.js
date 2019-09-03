import * as React from "react";
import {Input} from "antd";
import './Dashboard.css'


export class Dashboard extends React.Component {

  render() {
    return (
      <div className="converter-container">
        <div className="selector-wrapper">

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
}