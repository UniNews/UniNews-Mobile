import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import styles from './styles'
import Constants from '../../../config/constants'
import { View, ScrollView } from 'react-native';

class PostProfileScreen extends Component {
    constructor(props) {
        super(props);

    }

    render = () =>
        <ScrollView style={styles.container} >
            <View>
                {
                    this.props.articles ?
                        this.props.articles.map((l, i) => (
                            <ListItem
                                chevron
                                key={i}
                                leftAvatar={{
                                    source: { uri: l.imgs },
                                    size: 'large'
                                }}
                                title={l.title}
                                subtitle={l.author}
                                subtitleStyle={{
                                    color: Constants.PRIMARY_COLOR,
                                    fontFamily: 'Kanit-Regular'
                                }}
                                titleStyle={{
                                    fontFamily: 'Kanit-Regular'
                                }}
                                bottomDivider
                                onPress={() => this.props.event(l.news_id)}
                            />
                        ))
                        :
                        null
                }
            </View>
        </ScrollView >
}


export default PostProfileScreen;