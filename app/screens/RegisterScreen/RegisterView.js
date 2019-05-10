import React from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Input, Image, Button } from 'react-native-elements';
import { ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Constants from '../../config/constants'

class RegisterView extends React.Component {

    // static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            repassword: '',
            passwordError: ' ',
            errorAlert: '',
        };
    }


    // componentDidUpdate(prevProps) {
    //     if (this.props.registered) {
    //         console.log("TEST")
    //         this.props.navigation.navigate('Login')
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ errorAlert: nextProps.error })
        }
    }

    componentWillMount() {
        this.props.clearState();
    }

    render() {
        const { loading } = this.props
        const { errorAlert } = this.state

        return (
            <ImageBackground source={require('../../assets/imgs/bg.jpg')} style={{ width: '100%', height: '100%' }}>

                <View style={styles.container}>
                    {errorAlert != '' ?
                        Alert.alert(
                            "Error",
                            errorAlert,
                            [
                                {
                                    text: 'OK', onPress: () => this.setState({ errorAlert: '' })
                                },
                            ],
                        )
                        : null}

                    <Text style={styles.topic}>CREATE ACCOUNT</Text>

                    <KeyboardAvoidingView style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}
                        behavior="padding"
                        enabled>

                        <Input
                            autoCorrect={false}
                            placeholderTextColor={Constants.WHITE_COLOR}
                            inputStyle={{ color: Constants.WHITE_COLOR }}
                            placeholder='Name'
                            leftIcon={{ type: 'font-awesome', name: 'user', color: "#fff" }}
                            errorStyle={{ color: 'red' }}
                            errorMessage=' '
                            inputContainerStyle={styles.inputField}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            containerStyle={{ paddingTop: 22 }}
                            onChangeText={(text) => this.setState({ displayName: text })}
                        />

                        <Input
                            autoCorrect={false}
                            placeholderTextColor={Constants.WHITE_COLOR}
                            inputStyle={{ color: Constants.WHITE_COLOR }}
                            placeholder='Email'
                            leftIcon={{ type: 'font-awesome', name: 'envelope', color: "#fff" }}
                            errorStyle={{ color: 'red' }}
                            errorMessage=' '
                            inputContainerStyle={styles.inputField}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => this.setState({ email: text })}
                        />

                        <Input
                            secureTextEntry={true}
                            placeholderTextColor={Constants.WHITE_COLOR}
                            inputStyle={{ color: Constants.WHITE_COLOR }}
                            placeholder='Password'
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: "#fff" }}
                            errorStyle={{ color: 'red' }}
                            errorMessage=' '
                            inputContainerStyle={styles.inputField}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => this.setState({ password: text })}
                        />

                        <Input
                            secureTextEntry={true}
                            placeholderTextColor={Constants.WHITE_COLOR}
                            inputStyle={{ color: Constants.WHITE_COLOR }}
                            placeholder='Repeat Password'
                            leftIcon={{ type: 'font-awesome', name: 'unlock-alt', color: "#fff" }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.passwordError}
                            inputContainerStyle={styles.inputField}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => this.setState({ repassword: text })}
                        />

                        <Button
                            title="SIGN UP"
                            type="outline"
                            buttonStyle={styles.signupBtn}
                            titleStyle={{ color: Constants.WHITE_COLOR }}
                            loading={loading}
                            loadingProps={{ color: Constants.WHITE_COLOR }}
                            onPress={() => {
                                const { displayName, email, password, repassword } = this.state;

                                if (password != repassword)
                                    this.setState({ passwordError: ' Entered password is not matching.' })
                                else
                                    this.props.signupByEmail(email, password, displayName);
                            }}
                        />

                        <TouchableOpacity activeOpacity={0.6} style={{ paddingTop: 20 }} onPress={() => {
                            this.props.clearState();
                            this.props.navigation.goBack()
                        }}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Icon
                                    name="arrow-left"
                                    size={15}
                                    color="white"
                                />
                                <Text style={styles.goBackBtn}>  Sign In</Text>
                            </View>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </View>

            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputField: {
        backgroundColor: '#ffffff33',
        flexDirection: 'row',
        paddingVertical: 7,
        borderRadius: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        width: '85%',
    },
    topic: {
        paddingTop: 90,
        color: '#ffffffEE',
        fontSize: 22,
        fontWeight: '600',
        alignSelf: 'center'
    },
    signupBtn: {
        borderColor: Constants.WHITE_COLOR,
        borderRadius: 100,
        height: 51
    },
    goBackBtn: {
        color: '#ffffffEE',
        fontSize: 14,
        fontWeight: '600',
    }
});

RegisterView.propTypes = {
    signupByEmail: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    clearState: PropTypes.func.isRequired,
    registered: PropTypes.bool.isRequired,
};

export default RegisterView;
