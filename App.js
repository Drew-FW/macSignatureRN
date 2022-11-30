import React, {Component} from 'react';
import {View, Button, StyleSheet, Alert, TouchableHighlight, Image } from 'react-native';
import SignaturePad from 'react-native-signature-pad';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid, BackHandler } from 'react-native';


class SignatureView extends React.Component {

    signaturePad: SignaturePad
    previewURL: null

    state = {
        signaturePadKey: 0
    }

    _signaturePadError = (error) => {
            console.error(error);
        };

    _signaturePadChange = ({ base64DataUrl }) => {
        console.log("Got new signature: " + base64DataUrl);
        this.previewURL = base64DataUrl;
    }

    _closeApp = () => {
        BackHandler.exitApp();
    }

    cleanButtonAction = () => {
        this.setState({
            signaturePadKey: this.state.signaturePadKey + 1,
            imageURL : this.state.base64DataUrl
        })
        this.previewURL = this.state.base64DataUrl

    }

    _submit = ({ base64DataUrl }) => {
        console.log("hi + "+ this.previewURL);
        this.setState({
            imageURL : this.previewURL
        })
    }



    createSignaturePad = () => {
        this.signaturePad = React.createElement(SignaturePad, {
            onError: this._signaturePadError,
            onChange: this._signaturePadChange,
            style: { flex: 1, backgroundColor: 'white' },
            key: this.state.signaturePadKey
        })
        return this.signaturePad
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center'  }}>
                {this.createSignaturePad()}

                <View style={styles.fixToText}>
                    <TouchableHighlight style ={styles.controlButton}>
                        <Button onPress={this._closeApp}
                        title="Cancel"
                    />
                    </TouchableHighlight>
                    <TouchableHighlight style ={styles.controlButton}>
                        <Button onPress={this.cleanButtonAction}
                        title="Clear"
                    />
                    </TouchableHighlight>
                    <TouchableHighlight style ={styles.controlButton}>
                        <Button onPress={this._submit}
                        title="Done"
                    />
                    </TouchableHighlight>
                </View>

                <View style={{ width: '100%', height: '50%', justifyContent: 'center', backgroundColor: 'white' }}>
                    <Image source={{uri: this.state.imageURL }}
                        style={styles.image}
                        style={{marginLeft: '5%', width: '90%',
                            height: '90%', borderWidth: 5, borderColor: 'grey'}
                        }
                    />

                </View>
            </View>

        )
    }
}
export default SignatureView;

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  controlButton: {
    height: 40,
    width:'30%',
    borderRadius:10,
    marginTop :3}
});