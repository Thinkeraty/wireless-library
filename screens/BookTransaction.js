import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransaction extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedBookId: "",
        scannedStudentId: ""
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state;

      if(buttonState === "bookId") {
          this.setState({
          scanned: true,
          scannedBookId: data,
          buttonState: 'normal'
        });
      } else if(buttonState === "studentId") {
          this.setState({
          scanned: true,
          scannedStudentId: data,
          buttonState: 'normal'
        });
      }
    }

    render() {
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
      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>

            <View>
              <Image
                style={{width: 80, height: 80}}
                source={require('../assets/booklogo.jpg')}
              />
              <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Wi-Ly App</Text>
            </View>

            <View style={styles.inputField}>

              <TextInput 
                style={styles.inputBox}
                placeholder="Book Id"
                value={this.state.scannedBookId}
              />

              <TouchableOpacity 
                style={styles.scanButton} 
                onPress={() => {this.getCameraPermissions("bookId")}}
              >
              <Text style={styles.buttonText}>Scan</Text>

              </TouchableOpacity>

            </View>

            <View style={styles.inputField}>

              <TextInput 
                style={styles.inputBox}
                placeholder="Student Id"
                value={this.state.scannedStudentId}
              />

              <TouchableOpacity 
                style={styles.scanButton} 
                onPress={() => {this.getCameraPermissions("studentId")}}
              >
              <Text style={styles.buttonText}>Scan</Text>

              </TouchableOpacity>

            </View>

          <Text style={styles.displayText}>
            {
                hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
            }
          </Text>     
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 25,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#f00',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff'
    },
    inputField:{
      flexDirection: 'row',
      margin: 10,
    },
    inputBox:{
      width: 200,
      height: 50,
      borderWidth: 1.5,
      fontSize: 15,
      paddingLeft: 10
    }
  });