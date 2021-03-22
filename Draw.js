import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    PanResponder,
    Dimensions
} from 'react-native'
import Svg, {
    Polyline,
} from 'react-native-svg';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const App = () => {
    const [locations, setLocations] = useState([]);
    const [drawPoliLine, setDrawPoliLine] = useState("");

    console.log(drawPoliLine);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,

        onStartShouldSetPanResponderCapture: (event, gestureState) => true,

        onMoveShouldSetPanResponder: (event, gestureState) => false,

        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,

        onPanResponderGrant: (event, gestureState) => false,

        onPanResponderMove: (event, gestureState) => false,

        onPanResponderRelease: (event, gestureState) => {
            //After the change in the location
            let newData = []
            newData.push({
                myLocationX: event.nativeEvent.locationX.toFixed(2),
                myLocationY: event.nativeEvent.locationY.toFixed(2)
            })
            setLocations(locations => [...locations, ...newData])
            setDrawPoliLine(locations.toString)
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>
                    React Native Get Clicked Location of Touchscreen
                    Using PanResponder
        </Text>
                <View style={styles.childViewStyle} {...panResponder.panHandlers}>
                    {/*View to show green dot where user touched*/}
                    {locations.length > 0 ?
                        locations.map((data, index) => {
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.pointStyle,
                                        {
                                            left: parseFloat(data.myLocationX),
                                            top: parseFloat(data.myLocationY),
                                        },
                                    ]}
                                />
                            )
                        })
                        : null}

                    {/* <Svg height={height} width={width} >
                        <Polyline
                            points="10,10 20,12 30,20 40,60 60,70 95,90"
                            fill="none"
                            stroke="black"
                            strokeWidth="3"
                        />
                    </Svg> */}


                    {/* Marking touched position */}
                    {/* <View
            style={{
              flex: 1,
              backgroundColor: 'transparent'
            }}
            {...panResponder.panHandlers}
          /> */}

                    {/* <Svg height="100" width="100">
            <Line x1={parseFloat(locationX - 11)} y1={parseFloat(locationY - 2)} x2="100" y2="100" stroke="red" strokeWidth="2" />
          </Svg> */}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    childViewStyle: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#F5FCFF',
        borderColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    pointStyle: {
        height: 22,
        width: 22,
        position: 'absolute',
        borderRadius: 14,
        backgroundColor: '#000000',
    },
});

export default App;
