import React, { useState, useEffect, memo } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {ScatterChart} from 'react-native-charts-wrapper';

const greenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";
const step = 0.01;
function getRandomArbitrary(min, max, t=0) {
  return t>1?-(Math.random() * (max - min) + min):Math.random() * (max - min) + min;
}

const _randomYValues = (range, size) => {
  return _.times(size, () => {
    return {y: Math.random() * range, x: Math.random() * range}
  });
}
const TEXT_LENGTH = 40
const TEXT_HEIGHT = 14
const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;

var idInterval = 0;
const ScatterChartScreen = (props) =>{

  // const [dataChart, setDataChart] = useState({
  //   dataSets: [
  //     {
  //       values: _randomYValues(3, 100),
  //       label: "",
  //       config: {
  //         ...config,
  //         color: processColor('blue'),
  //       }
  //     },
  //     {
  //       values: _randomYValues(3, 100),
  //       label: "",
  //       config: {
  //         ...config,
  //         color: processColor('red'),
  //       }
  //     }
  //   ]
  // });
    return (
     
      <View style={styles.container}>
        <View style={styles.labelX}>
          {/* <Text>{props.titleY}</Text> */}
          {props.titleY.split('').map(char => <Text>{char}</Text>)}
        </View>
        <View style={styles.chart}>
        <ScatterChart
            style={styles.chartBody}
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
                axisMinimum: 0,
                // // axisMaximum: 8,
                // granularityEnabled: true
              }}
              yAxis={{
                  left: {
                      enabled: true,
                      spaceBottom: 100,
                      spaceTop: 100
                    },
                    right: {
                      enabled: false,
                    },
              }}

              data={props.convertData?{dataSets: props.data.map(props.convertData)}:{dataSets: props.data}}
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
              chartDescription={{ text: "" }}
              legend={{
                enabled: false
              }}
            />
          <View style={styles.labelY}>
            <Text>{props.titleX}</Text>
          </View>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 250,
    // height: 250,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: '#FFF',
  },
  chart: {
    flex: 12,
    // height: 250
    backgroundColor: '#FFF',
    padding: 0
  },
  chartBody: {
    flex: 1
    // height: 250
  },
  labelX: {
    transform: [
      {
        rotate: "-90deg"
      },
    ],
    textAlignVertical: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    opacity: 0.5
  },
  labelY: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFF',
    opacity: 0.5,
  }
});
export default memo(ScatterChartScreen);

const config = {
  mode: "CUBIC_BEZIER",
  scatterShape: 'CIRCLE',
  drawValues: false,
  lineWidth: 0.1,
  drawCircles: false,
  circleColor: processColor(petrel),
  drawCircleHole: false,
  circleRadius: 2,
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
  valueTextSize: 0
}

// // const data = {
// //   dataSets: [
    
// //   ]
// // }

// import React from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   processColor
// } from 'react-native';
// import update from 'immutability-helper';

// import _ from 'lodash';
// import {ScatterChart} from 'react-native-charts-wrapper';

// class ScatterChartScreen extends React.Component {

//   constructor() {
//     super();

//     this.state = {
//       legend: {
//         enabled: true,
//         textSize: 14,
//         form: 'CIRCLE',
//         wordWrapEnabled: true
//       },
//       marker: {
//         enabled: true,
//         type: 'com.github.reactNativeMPAndroidChart.example.marker.OvalBlueMarker'
//       }
//     };
//   }

//   componentDidMount() {
//     const size = 30;
//     const range = 20;

//     this.setState(
//       update(this.state, {
//         data: {
//           $set: {
//             dataSets: [
//               {
//               values: this._randomYValues(range, size),
//               label: 'DS 2',
//               config: {
//                 color: processColor('blue'),
//                 scatterShape: 'CIRCLE',
//                 scatterShapeHoleRadius: 6,
//                 scatterShapeHoleColor: processColor('teal')
//               }
//             }
//             ],
//           }
//         }
//       })
//     );
//   }

//   _randomYValues(range, size) {
//     return _.times(size, () => {
//       return {y: Math.random() * range, x: Math.random() * range}
//     });
//   }

//   handleSelect(event) {
//     let entry = event.nativeEvent
//     if (entry == null) {
//       this.setState({...this.state, selectedEntry: null})
//     } else {
//       this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
//     }

//     console.log(event.nativeEvent)
//   }

//   render() {
//     return (

//       <View style={{flex: 1}}>

//         <View style={{height:80}}>
//           <Text> selected entry</Text>
//           <Text> {this.state.selectedEntry}</Text>
//         </View>

//         <View style={styles.container}>
//           <ScatterChart
//             style={styles.chart}
//             data={this.state.data}
//             legend={this.state.legend}
//             marker={this.state.marker}
//             onSelect={this.handleSelect.bind(this)}
//             onChange={(event) => console.log(event.nativeEvent)}
//           />
//         </View>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF'
//   },
//   chart: {
//     flex: 1
//   }
// });

// export default ScatterChartScreen;

