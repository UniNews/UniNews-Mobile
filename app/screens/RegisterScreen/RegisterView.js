import React from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Input, Image, Button } from 'react-native-elements';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class RegisterView extends React.Component {

    // static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            repassword: '',
            passwordError: ' '
        };
    }

    componentWillMount() {
        this.props.clearState();
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/bg2.jpg')} style={{ width: '100%', height: '100%' }}>

                <Text>
                    {this.props.error}
                </Text>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <Text style={styles.topic}>CREATE ACCOUNT</Text>

                    <Input
                        inputStyle={{ color: 'white' }}
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
                        inputStyle={{ color: 'white' }}
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', color: "#fff" }}
                        errorStyle={{ color: 'red' }}
                        errorMessage=' '
                        inputContainerStyle={styles.inputField}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <Input
                        inputStyle={{ color: 'white' }}
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: "#fff" }}
                        errorStyle={{ color: 'red' }}
                        errorMessage=' '
                        inputContainerStyle={styles.inputField}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <Input
                        inputStyle={{ color: 'white' }}
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
                        titleStyle={{ color: 'white' }}
                        onPress={() => {
                            const { displayName, email, password, repassword } = this.state;

                            if (password != repassword)
                                this.setState({ passwordError: ' Entered password is not matching.' })
                            else
                                this.props.signupByEmail(email, password, displayName);
                        }}
                    />

                    <TouchableOpacity activeOpacity={0.6} style={{ paddingTop: 20 }} onPress={() => this.props.navigation.goBack()}>
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

            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
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
        color: '#ffffffEE',
        fontSize: 22,
        fontWeight: '600',
        alignSelf: 'center'
    },
    signupBtn: {
        borderColor: 'white',
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
    isLoading: PropTypes.bool.isRequired,
    clearState: PropTypes.func.isRequired,
};

export default RegisterView;
