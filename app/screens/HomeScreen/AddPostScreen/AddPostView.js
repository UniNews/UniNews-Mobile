import React from 'react';
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Picker,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';

import MultipleInput from './../../../components/MultipleInput';

import { ImagePicker, Permissions } from 'expo';
// import uuid from 'uuid';
// import firebase from './../../../config/firebase';
import { Image, Header, Icon } from 'react-native-elements';
import TxtInput from '../../../components/TextInput'
import Constants from '../../../config/constants'
import uploadService from '../../../services/upload'

// import PropTypes from 'prop-types';


class PostView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            message: '',
            image: '',
            uploading: false,
            title: '',
            description: '',
            titleError: '',
            descriptionError: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.completed) {
            this.props.navigation.goBack();
        }
    }

    checkIsEnabled(isEnabled) {
        this.setState({ isEnabled });
    }

    static defaultProps = {
        items: [
            {
                name: 'Technology',
                description: 'Software, Hardware, Coding, ...',
                iconColor: 'tomato',
                iconName: 'laptop',
                iconType: 'material'
            },
            {
                name: 'Sport',
                description: 'Football, Badminton, Tennis, ... ',
                iconColor: 'blue',
                iconName: 'ios-baseball',
                iconType: 'ionicon'
            },
            {
                name: 'Game',
                description: 'Activity, E-sport, ...',
                iconColor: 'green',
                iconName: 'game-controller',
                iconType: 'entypo'
            },
            {
                name: 'Love',
                description: 'Romance‎, Love stories‎, ...',
                iconColor: 'pink',
                iconName: 'ios-heart',
                iconType: 'ionicon'
            },
        ]
    };

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    addNewPost = () => {
        const { description, image, title } = this.state
        const { postNews, selectedCampus } = this.props
        const tags = this._emailField
            .getSelectedEmails()
        // console.log(tags)
        var isValid = this.validation()
        if (isValid) {
            postNews(selectedCampus, description, image, title, tags)
        }
    }

    validation = () => {
        let isValid = true;
        const { title, description } = this.state;
        if (title == '') {
            this.setState({ titleError: 'Please input title' })
            isValid = false
        }
        if (description == '') {
            this.setState({ descriptionError: 'Please input description' })
            isValid = false
        }
        if (!isValid)
            return false
        this.setState({ titleError: '' })
        this.setState({ descriptionError: '' })
        return true
    }

    render() {
        console.disableYellowBox = true;

        const { items, loading } = this.props;
        const { isEnabled, message, title, description, titleError, descriptionError, image, uploading } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={Constants.SECONDARY_COLOR}
                    leftComponent={
                        <Icon
                            underlayColor='transparent'
                            type='ionicon'
                            name={'ios-arrow-back'}
                            color={Constants.WHITE_COLOR}
                            size={27}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerTitle}>
                            NEW POST
                        </Text>
                    }
                    rightComponent={
                        loading ? <ActivityIndicator
                            color={Constants.WHITE_COLOR} />
                            :
                            <Icon
                                type='ionicon'
                                name={'ios-send'}
                                size={29}
                                color={Constants.WHITE_COLOR}
                                onPress={this.addNewPost}
                            />
                    }
                />

                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <ScrollView
                        style={styles.bringToBack}
                        keyboardShouldPersistTaps="always"
                    >

                        <View style={styles.topPost}>
                            <View style={{ paddingHorizontal: 10 }}>
                                <TxtInput
                                    label={"Title"}
                                    placeholder='Insert title here...'
                                    multiline={false}
                                    errorMessage={titleError}
                                    onChangeText={(text) => this.setState({ title: text })}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                                <MultipleInput
                                    ref={c => (this._emailField = c)}
                                    itemId="name"
                                    items={items}
                                    onSubmitEditing={isEnabled => this.checkIsEnabled(isEnabled)}
                                    onChipClose={isEnabled => this.checkIsEnabled(isEnabled)}
                                />
                            </View>
                        </View>

                        <View style={styles.bringToBack}>

                            <Text style={styles.imageTitle} >
                                Image
                            </Text>

                            <TouchableWithoutFeedback onPress={this._pickImage} >
                                <View style={styles.imageContainer}>

                                    {
                                        !uploading ?
                                            <Image
                                                source={(image == '') ? require('./../../../assets/imgs/default-image.png') : { uri: image }}
                                                style={styles.image}
                                                PlaceholderContent={<ActivityIndicator />}
                                            /> : <View
                                                style={styles.spinner}>
                                                <ActivityIndicator />
                                            </View >
                                    }

                                </View>
                            </TouchableWithoutFeedback>
                        </View>


                        <View style={styles.descriptionContainer}>
                            <TxtInput
                                label={"Description"}
                                placeholder='Insert description here...'
                                multiline={true}
                                errorMessage={descriptionError}
                                onChangeText={(text) => this.setState({ description: text })}
                            />
                        </View>

                    </ScrollView >
                </KeyboardAvoidingView>

            </View >


        );
    }

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _pickImage = async () => {
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
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
}

// async function uploadImageAsync(uri) {
//     const blob = await new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//             resolve(xhr.response);
//         };
//         xhr.onerror = function (e) {
//             console.log(e);
//             reject(new TypeError('Network request failed'));
//         };
//         xhr.responseType = 'blob';
//         xhr.open('GET', uri, true);
//         xhr.send(null);
//     });

//     const ref = firebase
//         .storage()
//         .ref()
//         .child('postImages')
//         .child(uuid.v4());
//     const snapshot = await ref.put(blob);

//     blob.close();

//     return await snapshot.ref.getDownloadURL();
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bringToBack: {
        zIndex: -1
    },
    button: {
        alignSelf: 'flex-end',
        backgroundColor: '#fff'
    },
    message: {
        justifyContent: 'flex-end',
        alignItems: 'center',

        color: 'rgba(0, 0, 0, 0.54)'
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Kanit-Regular'
    },
    topPost: {
        paddingTop: 20,
    },
    imageTitle: {
        paddingHorizontal: 21, fontSize: 16, color: Constants.SECONDARY_COLOR
    },
    imageContainer: {
        paddingTop: 10, alignSelf: 'center'
    },
    image: {
        width: 350, height: 250, borderRadius: 10
    },
    spinner: {
        width: 350, height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionContainer: {
        paddingHorizontal: 10, paddingTop: 10
    }

});

export default PostView;
