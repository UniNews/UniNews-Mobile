import React from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Input, Image, Button } from 'react-native-elements';
import { ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Constants from '../../config/constants'

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount() {
    this.props.clearState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.logged) {
      this.props.navigation.navigate('Loading');
    }
  }

  render() {

    const { isLoading, error } = this.props
    return (

      <ImageBackground source={require('../../assets/imgs/bg.jpg')} style={{ width: '100%', height: '100%' }}>
        {error ?
          Alert.alert(this.props.error)
          : null}
        <KeyboardAvoidingView style={styles.container}>
          <Image
            source={require('../../assets/imgs/logo.png')}
            style={{
              width: 260, height: 220,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Input
            placeholderTextColor={Constants.WHITE_COLOR}
            inputStyle={{ color: Constants.WHITE_COLOR }}
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: "#fff" }}
            inputContainerStyle={styles.inputField}
            leftIconContainerStyle={{ paddingRight: 10 }}
            containerStyle={{ paddingTop: 20 }}
            onChangeText={(text) => this.setState({ email: text })}
          />

          <Input
            placeholderTextColor={Constants.WHITE_COLOR}
            inputStyle={{ color: Constants.WHITE_COLOR }}
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'lock', color: "#fff" }}
            inputContainerStyle={styles.inputField}
            leftIconContainerStyle={{ paddingRight: 10 }}
            containerStyle={{ paddingTop: 20 }}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <Button
            title="LOGIN"
            buttonStyle={styles.loginBtn}
            titleStyle={{ color: Constants.PRIMARY_COLOR }}
            containerStyle={{ paddingTop: 20 }}
            onPress={() => {
              const { email, password } = this.state;
              this.props.loginByEmail(email, password);
            }}
            loading={isLoading}
            loadingProps={{ color: Constants.PRIMARY_COLOR }}
          />


          <Text style={styles.divider}> ──────── OR ──────── </Text>

          <View style={{
            padding: 20, alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
            <Button
              type="outline"
              icon={
                <Icon
                  name="facebook-f"
                  size={30}
                  color={Constants.WHITE_COLOR}
                />
              }
              onPress={() => {
                this.props.loginByFacebook();
              }}
              iconRight
              title="FACEBOOK  "
              buttonStyle={styles.socialBth}
              titleStyle={{ color: Constants.WHITE_COLOR }}
            />
            <Button
              type="outline"
              onPress={() => {
                this.props.loginByGoogle();
              }}
              icon={
                <Icon
                  name="google"
                  size={30}
                  color={Constants.WHITE_COLOR}
                />
              }
              iconRight
              title="GOOGLE  "
              buttonStyle={styles.socialBth}
              titleStyle={{ color: Constants.WHITE_COLOR }}
            />
          </View>

          <View style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.createAccountBtn}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.clearState()
              this.props.navigation.navigate('Register')
            }
            } activeOpacity={0.6}>
              <Text style={styles.createAccountBtn}>Create Account</Text>
            </TouchableOpacity>
          </View>

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
  loginBtn: {
    backgroundColor: Constants.WHITE_COLOR,
    borderRadius: 100,
    height: 50,
  },
  socialBth: {
    alignSelf: 'flex-start',
    borderColor: Constants.WHITE_COLOR,
  },
  divider: {
    paddingTop: 20,
    color: '#ffffffEE',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountBtn: {
    color: '#ffffffEE',
    fontSize: 14,
    fontWeight: '600',
  }
});

LoginView.propTypes = {
  loginByEmail: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  clearState: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  loginByFacebook: PropTypes.func.isRequired,
  loginByGoogle: PropTypes.func.isRequired
};


export default LoginView;
