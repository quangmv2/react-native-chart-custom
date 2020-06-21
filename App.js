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
import LineChartScreen from './src/LineChartScreen';
import ScatterChartScreen from './src/ScatterChartScreen';
import _ from 'lodash';

const greenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";
const colors = ['blue', 'red', 'green', 'gray'];
let indexColor = 0;
const stepX = 0.01;
const stepY = 0.05;
const loader = 500;
let xx = 0.2;
let idInterval = 0;
function getRandomArbitrary(min, max, t=0) {
  return t>1?-(Math.random() * (max - min) + min):Math.random() * (max - min) + min;
}

const _randomYValues = (range, size) => {
  return _.times(size, () => {
    return {y: Math.random() * range, x: Math.random() * range}
  });
}

var arrTemp;
const template = () => { xx-=getRandomArbitrary(0.01, 0.2); return ({
  values: [{
    x: xx, y: getRandomArbitrary(0.1, 0.5)
  }],
  label: "",
  config: {
    ...config,
    color: processColor(colors[indexColor]),
  }
})};

var up = true;

const App: () => React$Node = () => {

  const [data, setData] = useState([
    template()
  ]);

  const [status, setStatus] = useState(false);

  const createData = () => {
    setData(datas => {
      let data = datas.slice();
      let obj = data[data.length - 1];
      let  values  = obj.values.slice();
      let value = values[values.length - 1];
      if (values.length > 1 && value.y <= 0){
        up = true;
        if (++indexColor>3) indexColor = 0;
        data.push(template())
        return data;
      }
      if (value.y>2) up = false;
      if (up) {
        values.push({
          x: value.x+stepX,
          y: value.y+stepY,
        });
      } else {
        values.push({
          x: value.x+stepX,
          y: value.y-stepY,
        });
      }
      const k = {
        ...obj, values: values.slice()
      }
      data.push(k);
      return data;
    })
  }

  const start = () => {
    setStatus(true);
    clearInterval(idInterval);
    xx=0.2;
    setData([template()]);
    idInterval = setInterval(() => {
      createData();
    }, 300);
  }

  const continueData = (statusDT) => {
    setStatus(statusDT);
  }

  const logData = () => {
    Alert.alert('Hello bi lua roi nha');
  }

  const convertData = (obj) =>  {
    let {values} = obj;
    values = values.map(({x, y}) => ({x: x/y, y:x}));
    const k = {...obj, values};
    return k;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={"#FFF"} />
      <SafeAreaView style={styles.container}>
        {/* <Text>Hello</Text> */}
        {/* <LineChartScreen /> */}
        <View style={styles.chart}>
          <ScatterChartScreen data={[]} titleX={"Lít"} titleY={"Lít/giây"} convertData={convertData}/>
        </View>
        <View style={styles.chart}>
          <ScatterChartScreen data={data} titleX={"Giây"} titleY={"Lít"} />
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
  // scatterShape: 'CIRCLE',
  drawValues: false,
  lineWidth: 0.1,
  drawCircles: true,
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
  valueTextSize: 0
}