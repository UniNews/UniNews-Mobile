import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import styles from './styles'
import Constants from '../../../config/constants'
import { View, ScrollView } from 'react-native';
import Dialog from "react-native-dialog";




class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diaplayNameDialog: false,
            aboutMeDialog: false,
            changeDisplayName: '',
            changeAboutMe: '',
        }
    }
    render() {
        const {
            diaplayNameDialog, aboutMeDialog
        } = this.state

        return (
            < ScrollView style={styles.container} >
                {/* <Dialog.Container visible={diaplayNameDialog}>
                    <Dialog.Title>Update display name</Dialog.Title>
                    <Dialog.Input onChangeText={(text) => this.setState({ changeDisplayName: text })
                    }></Dialog.Input>
                    <Dialog.Button placeholder="type here..." label="Cancel" onPress={() => {
                        this.setState({
                            diaplayNameDialog: false,
                        })
                    }} />
                    <Dialog.Button label="Update" onPress={() => this.props.onDisplayNamePress(this.state.changeDisplayName)} />
                </Dialog.Container>

                <Dialog.Container visible={aboutMeDialog}>
                    <Dialog.Title>Update about me</Dialog.Title>
                    <Dialog.Input placeholder="type here..." onChangeText={(text) => this.setState({ changeAboutMe: text })
                    }></Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={() => {
                        this.setState({
                            aboutMeDialog: false,
                        })
                    }} />
                    <Dialog.Button label="Update" onPress={() => this.props.onAboutMePress(this.state.changeAboutMe)} />
                </Dialog.Container> */}

                <ListItem
                    chevron
                    title="Display name"
                    subtitleStyle={{ color: Constants.PRIMARY_COLOR }}
                    subtitle={this.props.displayName}
                    leftIcon={{ name: "account-circle" }}
                    // onPress={() => {
                    //     if (this.props.isRoot)
                    //         this.setState({
                    //             diaplayNameDialog: true,
                    //         })
                    // }}
                />
                <ListItem
                    chevron
                    title="About me"
                    subtitleStyle={
                        this.props.aboutMe ? { color: Constants.PRIMARY_COLOR } : null
                    }
                    subtitle={this.props.aboutMe ? this.props.aboutMe : 'not set'}
                    leftIcon={{ name: "message" }}
                    // onPress={() => {
                    //     if (this.props.isRoot)
                    //         this.setState({
                    //             aboutMeDialog: true,
                    //         })
                    // }}
                />
            </ScrollView >
        )
    }

}


export default ProfileDetail;