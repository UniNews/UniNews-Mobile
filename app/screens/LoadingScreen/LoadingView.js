import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
import firebase from './../../config/firebase'


class LoadingView extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            this.props.navigation.navigate(user ? 'Main' : 'Auth')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

LoadingView.propTypes = {

};


export default LoadingView;
