import React, { Component } from 'react';
import { Avatar, Button, Divider, Header, Icon, Input } from 'react-native-elements';
import styles from './styles'
import Constants from '../../config/constants'
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import uploadService from '../../services/upload'
import { ImagePicker, Permissions } from 'expo';

class ChangeProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            aboutMe: '',
            img: '',
            uploading: false
        }
    }

    _takePhoto = async () => {
        await Permissions.askAsync(Permissions.CAMERA);

        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _pickImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                uploadUrl = await uploadService.uploadImageAsync(pickerResult.uri);
                this.setState({ img: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };


    componentDidMount() {
        const { profile } = this.props;
        this.setState({
            displayName: profile.displayName,
            aboutMe: profile.aboutMe,
            img: profile.img
        })
    }

    updateProfile = () => {
        const { updateProfile, profile } = this.props
        const { displayName, aboutMe, img } = this.state

        updateProfile(profile.user_id, displayName, aboutMe, img)

    }

    componentDidUpdate(prevProps) {
        const { error, logged } = this.props;
        if (error) Alert.alert('Error: ', error);
        if (!logged) this.props.navigation.navigate('Auth');
    }

    render() {
        console.disableYellowBox = true;

        const { displayName, aboutMe, img, uploading } = this.state
        const { logoutUser, isLogoutLoading, isProfileLoading } = this.props

        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={Constants.SECONDARY_COLOR}
                    leftComponent={
                        <Icon
                            type='ionicon'
                            name={'ios-arrow-back'}
                            color={Constants.WHITE_COLOR}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerTitle}>
                            {"SETTINGS"}
                        </Text>
                    }
                    rightComponent={
                        isProfileLoading ? <ActivityIndicator
                            color={Constants.WHITE_COLOR} />
                            :
                            <Icon
                                type='ionicon'
                                name={'ios-checkmark-circle'}
                                size={29}
                                color={Constants.WHITE_COLOR}
                                onPress={() => {
                                    this.updateProfile()
                                }}
                            />
                    }
                />

                {
                    isLogoutLoading ?
                        <ActivityIndicator
                            size={'large'}
                            style={styles.activityIndicator} />
                        :
                        <View >
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={styles.avatar}>
                                    {uploading ?
                                        <ActivityIndicator
                                            size={'large'}
                                            style={styles.activityIndicator} />
                                        :
                                        <Avatar
                                            onPress={() => {
                                                this._pickImage()
                                            }}
                                            size={150}
                                            rounded
                                            source={{
                                                uri: img,
                                            }}
                                            containerStyle={{
                                                borderColor: Constants.SECONDARY_COLOR, borderWidth: 2
                                            }}
                                        />
                                    }

                                </View>

                            </View>
                            <View style={styles.inputContainer}>
                                <Input
                                    autoCorrect={false}
                                    label={"Display Name"}
                                    value={displayName}
                                    onChangeText={(text) => {
                                        this.setState({ displayName: text });
                                    }}
                                />
                                <Input
                                    autoCorrect={false}
                                    containerStyle={{ paddingTop: 20 }}
                                    label={"About Me"}
                                    value={aboutMe}
                                    onChangeText={(text) => {
                                        this.setState({ aboutMe: text });
                                    }}
                                />
                            </View>

                            <Button
                                containerStyle={{ padding: 50 }}
                                title="Sign Out"
                                type="outline"
                                onPress={() => {
                                    logoutUser()
                                }}
                            />
                        </View>

                }

            </View >

        )
    }
}

ChangeProfileScreen.propTypes = {
    isLogoutLoading: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    isProfileLoading: PropTypes.bool.isRequired,
};


export default ChangeProfileScreen;