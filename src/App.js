import React, { Component } from "react";

import ChanceRain from "./chance_rain";
import AmountRainfall from "./amount_rainfall";

export default class App extends Component {
  state = {
    items: [],
    days: [],
    amount: [],
  };
  async componentDidMount() {
    const url =
      "https://private-4945e-weather34.apiary-proxy.com/weather34/rain";
    const reponse = await fetch(url);
    const data = await reponse.json();
    let items = data;
    let amount = items.map((item) => item.days.map((day) => day.amount));
    let days = items.map((item) => item.days.map((day) => day.day));

    this.setState({
      items,
      days: days[0],
      amount: amount[0],
    });
  }
  render() {
    const { days, amount } = this.state;
    return (
      <>
        <div className="header"> Weather Service Dashboard</div>
        {days.length > 0 && amount.length > 0 && (
          <div className="app">
            <div className="chance">
              <ChanceRain days={days} amount={amount} />
            </div>
            <div className="amount">
              <AmountRainfall days={days} amount={amount} />
            </div>
          </div>
        )}
      </>
    );
  }
}
