import React, { useState, useEffect } from 'react';
import {
  Button,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native'


const App = () => {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      if (isRunning === false) {
        setIsRunning(true)
      }
      intervalId = setInterval(() => {
        var secondCounter = (counter % 60) < 0 ? 0 : (counter % 60);
        var minuteCounter = (Math.floor(counter / 60)) < 0 ? 0 : (Math.floor(counter / 60));

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        if ((counter + increment) >= -10) {
          setCounter(counter => counter + increment);
        }
        else {
          stopTimer()
        }
      }, 500)
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter])

  const stopTimer = () => {
    setIsActive(false)
    setIsRunning(false)
    setCounter(0)
    setSecond('00')
    setMinute('00')
    setIncrement(1)
  }

  const changeValue = (value) => {
    let newIncrement = increment + value
    if (newIncrement > -11 && newIncrement < 11) {
      if (newIncrement === 0) {
        setIsActive(false)
      }
      else if (isRunning === true) {
        setIsActive(true)
      }
      setIncrement(increment + value)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text} >{minute}</Text>
        <Text>:</Text>
        <Text style={styles.text}>{second}</Text>
      </View>
      <View style={styles.buttonStyle}>
        <Button color="#1E6738" onPress={() => setIsActive(!isActive)} title={isActive ? "Pause" : "Start"} />

      </View>
      <View style={styles.buttonStyle}>
        <Button color="#1E6738" onPress={() => stopTimer()} title='Stop' />
      </View>

      <View style={[styles.row, { marginTop: 16 }]}>
        <TouchableOpacity onPress={() => changeValue(1)} style={styles.button}><Text style={styles.text2}>+</Text></TouchableOpacity>
        <Text style={[styles.text, { marginTop: 8 }]}>{increment}</Text>
        <TouchableOpacity onPress={() => changeValue(-1)} style={styles.button}><Text style={styles.text2}>-</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 16,

  },
  text2: {
    color: 'white',
    fontSize: 24,
  },
  buttonStyle: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#1E6738',
    height: 40,
    width: 40,
    alignItems: 'center',
    paddingTop: 1,
    marginRight: 8,
    marginLeft: 8,
  },


});

export default App;
