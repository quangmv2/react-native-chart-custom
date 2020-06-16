import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  LayoutAnimation
} from "react-native";
import update from "immutability-helper";

import { LineChart } from "react-native-charts-wrapper";

const greenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";

const LineChartScreen = _ => {

//   handleSelect(event) {
//     let entry = event.nativeEvent;
//     if (entry == null) {
//       this.setState({ ...this.state, selectedEntry: null });
//     } else {
//       this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
//     }

//     console.log(event.nativeEvent);
//   }

    return (
      <View style={styles.container}>
        <View style={styles.labelX}>
          <Text>Lít/</Text>
          <Text>giây</Text>
        </View>
        <View style={styles.chart}>
          <LineChart
            style={styles.chartBody}
            data={data}
            chartDescription={{ text: "" }}
            legend={{
              enabled: false
            }}
            // marker={{
            //   enabled: true,
            //   markerColor: processColor("white"),
            //   textColor: processColor("black")
            // }}
            xAxis={{
              enabled: true,
              granularity: 0.6,
              drawLabels: true,
              position: "BOTTOM",
              drawAxisLine: true,
              drawGridLines: false,
              fontFamily: "HelveticaNeue-Medium",
              fontWeight: "bold",
              textSize: 12,
              textColor: processColor("gray"),
            //   valueFormatter: ['0', '0.6', '1.2', '1.8']
            }}
            yAxis={{
              left: {
                enabled: true
              },
              right: {
                enabled: false,
              },
              
            }}
            autoScaleMinMaxEnabled={true}
            drawGridBackground={false}
            drawBorders={false}
            touchEnabled={true}
            dragEnabled={false}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={event => console.log(event.nativeEvent)}
          />
          <View style={styles.labelY}>
            <Text>Lít</Text>
        </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 250,
    height: 250,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  chart: {
    flex: 12,
    // height: 250
    backgroundColor: '#FFF',
    padding: 0
  },
  chartBody: {
    // flex: 1,
    height: 250
  },
  labelX: {
    transform: [
      {
        rotate: "90deg"
      }
    ],
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    opacity: 0.5
  },
  labelY: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5
  }
});

export default LineChartScreen;

const config = {
    mode: "CUBIC_BEZIER",
    drawValues: false,
    lineWidth: 2,
    drawCircles: false,
    circleColor: processColor(petrel),
    drawCircleHole: false,
    circleRadius: 5,
    highlightColor: processColor("transparent"),
    color: processColor('blue'),
    drawFilled: false,
    fillGradient: {
      colors: [processColor(petrel), processColor(greenBlue)],
      positions: [0, 0.5],
      angle: 90,
      orientation: "TOP_BOTTOM"
    },
    fillAlpha: 1000,
    valueTextSize: 15
}

const data = {
    dataSets: [
      {
        values: [
          {
            y: 0,
            x: 0.1,
          },
          {
            y: 2,
            x: 0.3,
          },
          {
            y: 3,
            x: 0.9,
          },
          {
            y: 4,
            x: 1.6,
          },
          {
            y: 2.5,
            x: 2.1,
          },
          {
            y: 0,
            x: 2.6,
          }
        ],
        label: "",
        config: {
          ...config,
          color: processColor('blue'),
        }
      },
      {
          values: [
              {
                y: 0,
                x: 0.1,
              },
              {
                y: -2,
                x: 0.3,
              },
              {
                y: -3,
                x: 0.9,
              },
              {
                y: -4,
                x: 1.6,
              },
              {
                y: -2.5,
                x: 2.1,
              },
              {
                y: 0,
                x: 2.6,
              },
              {
                y: 0,
                x: 0.1,
              },
              {
                y: -2,
                x: 0.3,
              },
              {
                y: -3,
                x: 0.9,
              },
              {
                y: -4,
                x: 1.6,
              },
              {
                y: -2.5,
                x: 2.1,
              },
              {
                y: 0,
                x: 2.6,
              }
            ],
          label: "",
          config: {
            ...config,
            color: processColor('blue'),
          }
        },
      {
        values: [
          {
            y: 1,
            x: 0.7,
          },
          {
            y: 1.8,
            x: 1.3,
          },
          {
            y: 3,
            x: 1.6,
          },
          {
            y: 3.2,
            x: 2.0,
          },
          {
            y: 2.1,
            x: 2.4,
          },
          {
            y: 0,
            x: 2.8,
          }
        ],
        label: "",
        config: {
          ...config,
          color: processColor('red'),
        }
      },
      {
          values: [
            {
              y: 0,
              x: 0.7,
            },
            {
              y: -1.8,
              x: 1.3,
            },
            {
              y: -3,
              x: 1.6,
            },
            {
              y: -3.2,
              x: 2.0,
            },
            {
              y: -2.1,
              x: 2.4,
            },
            {
              y: 0,
              x: 2.8,
            }
          ],
          label: "",
          config: {
           ...config,
           color: processColor('red'),
          }
        }
    ]
  }
