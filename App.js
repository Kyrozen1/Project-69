import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ScanScreen from './screens/ScanScreen';

export default class App extends React.Component{
  render(){
    return (
    <View>
      <ScanScreen/>
    </View>
    );
  }
}