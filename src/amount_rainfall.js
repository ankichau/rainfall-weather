import "./App.css";
import React from "react";
import { Bar } from "react-chartjs-2";

function AmountRainfall(props) {
  console.log(props);
  const state = {
    labels: props.days,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "#a3c6e2",
        borderColor: "  #093a62",
        borderWidth: 4,
        data: props.amount,
        hoverBackgroundColor: [
          "#0a1a27",
          "#0a1a27",
          "#0a1a27",
          "#0a1a27",
          "#0a1a27",
          "#0a1a27",
          "#0a1a27",
        ],
      },
    ],
  };
  return (
    <div className="canvas-container">
      <Bar
        data={state}
        height={320}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Average Rainfall per month",
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
                  labelString: "Amount of rainfall (1/m2) ",
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
                  fontSize: 15,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
export default AmountRainfall;
