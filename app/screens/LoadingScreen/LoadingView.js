import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
import firebase from './../../config/firebase'


class LoadingView extends React.Component {

    componentDidMount() {

        const { autoLogin, getProfile } = this.props

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                getProfile(user.uid)
                autoLogin(user)
            } else {
                this.props.navigation.navigate('Auth')
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logged && nextProps.getProfileCompleted) {
            this.props.navigation.navigate('Main')
        }
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
    isLoading: PropTypes.bool.isRequired,
    autoLogin: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired,
    getProfileCompleted: PropTypes.bool.isRequired,
    getProfile: PropTypes.func.isRequired,
};


export default LoadingView;
