import React from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { Input, Image, Button } from 'react-native-elements';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';


class LoginView extends React.Component {

  // static navigationOptions = { header: null };

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

  render() {
    return (

      <ImageBackground source={require('../../assets/bg2.jpg')} style={{ width: '100%', height: '100%' }}>
        <KeyboardAvoidingView style={styles.container}>
          <Text>
            {this.props.error}
          </Text>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 260, height: 220,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Input
            // placeholderTextColor="#ffffff33"
            inputStyle={{ color: 'white' }}
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: "#fff" }}
            inputContainerStyle={styles.inputField}
            leftIconContainerStyle={{ paddingRight: 10 }}
            containerStyle={{ paddingTop: 20 }}
            onChangeText={(text) => this.setState({ email: text })}
          />

          <Input
            // placeholderTextColor="#fff"
            inputStyle={{ color: 'white' }}
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
            titleStyle={{ color: '#f50' }}
            containerStyle={{ paddingTop: 20 }}
            onPress={() => {
              const { email, password } = this.state;
              this.props.loginByEmail(email, password);
            }}

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
                  color="white"
                />
              }
              iconRight
              title="FACEBOOK  "
              buttonStyle={styles.socialBth}
              titleStyle={{ color: 'white' }}
            />
            <Button
              type="outline"
              icon={
                <Icon
                  name="google"
                  size={30}
                  color="white"
                />
              }
              iconRight
              title="GOOGLE  "
              buttonStyle={styles.socialBth}
              titleStyle={{ color: 'white' }}
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} activeOpacity={0.6}>
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
    backgroundColor: 'white',
    borderRadius: 100,
    height: 50,
  },
  socialBth: {
    alignSelf: 'flex-start',
    borderColor: 'white',
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
};


export default LoginView;
