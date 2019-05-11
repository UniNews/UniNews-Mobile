import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
import firebase from './../../config/firebase'


class LoadingView extends React.Component {


    componentWillMount() {
        const { autoLogin, getProfile } = this.props
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                autoLogin(user)
                getProfile(user.uid)
            } else {
                this.props.navigation.navigate('Auth')
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    // componentDidMount() {

    //     const { autoLogin, clearState, clearProfile } = this.props
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             console.log("HAS ")
    //             // getProfile(user.uid)
    //             autoLogin(user)
    //             // this.props.navigation.navigate('Main')
    //         } else {
    //             clearState()
    //             clearProfile()
    //             this.props.navigation.navigate('Auth')
    //         }
    //     })
    // }

    componentWillReceiveProps(nextProps) {
        const { getProfile } = this.props

        // if (nextProps.logged) {
        //     getProfile(nextProps.user.uid)
        // }
        // if (nextProps.getProfileCompleted) {
        //     this.props.navigation.navigate('Main')
        // }
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
    // user: PropTypes.object.isRequired
};


export default LoadingView;
