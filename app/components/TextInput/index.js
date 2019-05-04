import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { Input, Image, Header, Icon } from 'react-native-elements';
import Constants from './../../config/constants'

class TxtInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerStyle: {},
            inputStyle: {}
        };
    }

    onFocus = () => {
        const state = { ...this.state };
        state.containerStyle = {
            borderBottomColor: 'tomato'
        };
        state.inputStyle = {
            color: 'tomato'
        }

        this.setState(state);
    }

    onBlur = () => {
        console.log('on ONBLUR')
        const state = { ...this.state };
        state.containerStyle = {};
        state.inputStyle = {};

        this.setState(state);
    }

    render = () => <Input
        labelStyle={[styles.labelStyle, this.state.inputStyle]}
        label={this.props.label}
        placeholder={this.props.placeholder}
        multiline={this.props.multiline}
        inputContainerStyle={[styles.inputContainer, this.state.containerStyle]}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
        errorMessage={this.props.errorMessage}
        onChangeText={this.props.onChangeText}
    />
}

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: Constants.SECONDARY_COLOR
    },
    labelStyle: {

        fontSize: 15, fontWeight: 'normal', color: Constants.SECONDARY_COLOR
    }
});

export default TxtInput;