import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned: false,
      scannedData:"",
      buttonState:'normal'
    }
  }
  getCameraPemission = async (id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState:id,
      scanned: false,
    })
  }
  handleBarCodeScanner = async ({type,data})=>{
    const {buttonState}=this.state
    if(buttonState==="clicked"){
      this.setState({
        scanned:true,
        buttonState:'normal',
        scannedData:data,
      })
    }
  }
  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions){
      return(
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
      );
    }
    else if(buttonState === "normal"){
      return(
        <View style={styles.container}>
          <View>
            <Image
              style={{marginTop:90}}
              source={require("../assets/camera.jpg")}
            />
          </View>
          <View>
            <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>
          </View>
          <View>
            <TextInput style={styles.inputBox} placeholder="Data" 
              value={this.state.scannedData}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={()=>{this.getCameraPemission("clicked")}}>
              <Text style={{color:'white'}}>Scan QR Code</Text>
            </TouchableOpacity> 
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  displayText:{
    fontSize:15,
    textDecorationLine:'underline',
    marginTop:350
  },
  scanButton:{
    backgroundColor:'#2169f3',
    padding:10,
    marginTop:10,
    height:40,
  },
  inputBox:{
      marginTop:400,
      width:200,
      height:40,
      borderWidth:1.5,
      fontSize:20,
    },
})