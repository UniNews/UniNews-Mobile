import React, { Component } from 'react';
import { ListItem, Overlay, Divider } from 'react-native-elements';
import styles from './styles'
import Constants from '../../../config/constants'
import { View, ScrollView, Text } from 'react-native';


const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        user_id: 'test'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        user_id: 'test'
    },
]

class FollowingProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    onClick = (id) => {
        const { event } = this.props;
        this.props.onBackdropPress()

        event(id)
    }

    render() {

        return (
            <Overlay
                isVisible={this.props.isVisible}
                onBackdropPress={() =>
                    this.props.onBackdropPress()
                }
            >
                <ScrollView style={styles.container} >
                    <View>

                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>

                        <View style={{ paddingTop: 20 }}>
                            <Divider style={{ backgroundColor: 'grey' }} />
                        </View>

                        {
                            this.props.users ?
                                this.props.users.map((l, i) => (
                                    <ListItem
                                        chevron
                                        key={i}
                                        leftAvatar={{ source: { uri: l.img } }}
                                        title={l.displayName}
                                        titleStyle={{
                                            color: Constants.PRIMARY_COLOR,
                                            fontFamily: 'Kanit-Regular'
                                        }}
                                        subtitleStyle={{
                                            fontFamily: 'Kanit-Regular'
                                        }}
                                        subtitle={l.aboutMe}
                                        onPress={() => this.onClick(l.user_id)}
                                    />
                                )) : null
                        }
                    </View>
                </ScrollView >
            </Overlay>

        )
    }
}


export default FollowingProfileScreen;