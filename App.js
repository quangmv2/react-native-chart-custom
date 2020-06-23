/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  processColor,
  TouchableOpacity,
  View,
  Text,
  Alert
} from 'react-native';
// import LineChartScreen from './src/LineChartScreen';
import ScatterChartScreen from './src/ScatterChartScreen';
import _ from 'lodash';

const stepX = 0.001;
const stepY = 0.01;
const petrel = "rgb(59, 145, 153)";
function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min);
}

const colors = ['blue', 'red', 'green', 'gray'];
let indexColor = 0;

let up = 0;
let point = 0;

const App: () => React$Node = () => {

  const [data1, setData1] = useState(
        {
          values: [],
          label: "",
          config: {
            ...config,
            color: processColor(colors[indexColor]),
          }
        });
  const [data2, setData2] = useState(
    {
      values: [],
      label: "",
      config: {
        ...config,
        color: processColor(colors[indexColor]),
      }
    }
  );
  const [status, setStatus] = useState(false);
  // const [point, setPoint] = useState(0);


  const createData = (datas) => {
    let data = datas.values.slice();
    let length = data.length;
    let value = length>0?data[length - 1] : {x: 0, y: 0};

    if (up===0) {
      value = {
        x: value.x + getRandomArbitrary(0.0005, 0.0008),
        y: value.y + getRandomArbitrary(0.008, 0.01),
      };
      if (point >= 300) {
          up++;
          point =  0;
      };
      point++;
      // console.log(length, up);
    }

    if (up===1) {
      value = {
        x: value.x + getRandomArbitrary(0.0001, 0.0009),
        y: value.y - getRandomArbitrary(0.008, 0.01),
      };
      if (point >= 250) {
        up++;
        point =  0;
      };
      point++;
      // console.log(length, up);
    }

    if (up===2) {
      let k = 0;
      value = {
        x: value.x - getRandomArbitrary(0.0005, 0.0009),
        y: value.y - getRandomArbitrary(0.0005, 0.0008),
      };
      if (point >= 200) {
        up = 0;
        k = 1;
        point = 0;
      };
      point++;
      if (k===1) {
        value = {
          x: value.x - getRandomArbitrary(0.005, 0.009),
          y: getRandomArbitrary(0.001, 0.003),
        };
        indexColor = ++indexColor>3?0:indexColor; 
      }
    }

    
    data.push(value);
    return {
      label: "",
      config: {
        ...datas.config,
        color: processColor(colors[indexColor]),
      },
      values: data
    };

  }
  
  const start = () => {
    setInterval(() => {
      setData1(createData);
    }, 30);
  }

  // console.log(data1);


  const continueData = (statusDT) => {
  }

  const logData = () => {
  }

  const convertData = (obj) =>  {
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFF"} />
      <SafeAreaView style={styles.container}>
        {/* <Text>Hello</Text> */}
        {/* <LineChartScreen /> */}
        <View style={styles.chart}>
          <ScatterChartScreen dataChart={data2} titleX={"Lít"} titleY={"Lít/giây"}/>
        </View>
        <View style={styles.chart}>
          <ScatterChartScreen dataChart={data1} titleX={"Giây"} titleY={"Lít"} />
        </View>
        <View style={styles.functions}>
          <TouchableOpacity style={styles.function} onPress={start}>
            <Text>Bắt đầu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.function} onPress={status?()=>{clearInterval(idInterval); setStatus(false); }:()=>{setStatus(true); idInterval = setInterval(() => {
      createData();
    }, 30);}}>
            <Text> {status?'Tạm dừng':'Tiếp tục'} </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  chart: {
    flex: 4
  },
  functions: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: '#FFF',
  },
  function: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
});

export default App;

function delay(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const config = {
  mode: "CUBIC_BEZIER",
  scatterShape: 'CIRCLE',
  drawValues: false,
  lineWidth: 0.1,
  drawCircles: true,
  circleColor: processColor(petrel),
  drawCircleHole: false,
  circleRadius: 5,
  highlightColor: processColor("transparent"),
  color: processColor('blue'),
  drawFilled: false,
  fillAlpha: 1000,
  valueTextSize: 0
}