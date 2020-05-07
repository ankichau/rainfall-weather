import "./App.css";
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class ChanceRain extends Component {
  state = {
    pressure: 1010,
    temperature: 15,
    lower_bound: [],
    upper_bound: [],
    mean: [],
  };

  componentDidMount() {
    console.log(this.props, "========lala========");
    this.chanceOfRain(this.props.amount);
  }

  handelchange = (e, amount) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(
      {
        [name]: value,
      },
      this.chanceOfRain(amount)
    );
  };

  chanceOfRain = (amount) => {
    let { pressure, temperature } = this.state;

    var score = amount.map((amt) => {
      return (
        Math.log(amt + 1) * Math.log(pressure - 929) * Math.log(temperature - 9)
      );
    });

    var mean = score.map((src) => Math.min(Math.max(src, 0), 100));
    var upper_bound = mean.map((mn) => Math.min(1.5 * mn, 100));
    var lower_bound = mean.map((mn) => Math.min(0.5 * mn, 100));

    this.setState({
      mean: mean,
      lower_bound: lower_bound,
      upper_bound: upper_bound,
    });
  };

  render() {
    const state = {
      labels: this.props.days,
      datasets: [
        {
          label: "lower-bound",

          borderColor: "#597f9b",
          borderWidth: 4,
          data: this.state.lower_bound,
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
        },
        {
          label: "upper-bound",
          borderColor: "#093a62",
          borderWidth: 4,
          fontColor: "black",
          data: this.state.upper_bound,
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
        },

        {
          label: "mean",

          borderColor: "#0c4879 ",
          borderWidth: 4,
          data: this.state.mean,
        },
      ],
    };
    return (
      <>
        <div>
          <Line
            data={state}
            height={280}
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Chance of rain chart",
                fontSize: 20,
                fontColor: "#03192b",
              },
              legend: {
                display: true,
                position: "right",
              },
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Percentage (%)",
                      fontColor: "#093a62",
                      fontSize: 15,
                    },
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Upcoming days",
                      fontColor: "#093a62",
                    },
                  },
                ],
              },
            }}
          />
        </div>
        <div className="range-chance">
          <div className="inputs">
            <span className="name-input">
              Pressure [hPa]:
              <span style={{ color: "#093a62", fontSize: 15 }}>
                {this.state.pressure}{" "}
              </span>
            </span>

            <input
              name="pressure"
              type="range"
              min={970}
              max={1030}
              value={this.state.pressure}
              onChange={(e) => this.handelchange(e, this.props.amount)}
              className="input"
            />
          </div>

          <div className="inputs">
            <span className="name-input">
              Temperature [C]:
              <span style={{ color: "#093a62", fontSize: 15 }}>
                {this.state.temperature}{" "}
              </span>{" "}
            </span>
            <input
              name="temperature"
              type="range"
              min={10}
              max={30}
              value={this.state.temperature}
              onChange={(e) => this.handelchange(e, this.props.amount)}
              className="input"
            />
          </div>
        </div>
      </>
    );
  }
}
