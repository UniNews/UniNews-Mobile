/**
 * Created by ggoma on 2016. 11. 22..
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import Constants from './../../config/constants';


export default class ArticleItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card containerStyle={styles.block}
                image={{ uri: this.props.img }}>
                <View style={styles.bottomCardContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Icon type='evilicon' name='heart' color='grey' size={26} />
                </View>

                <Text style={styles.author}>
                    {this.props.author}
                </Text>

                <View style={styles.iconContainer}>
                    <Icon type='evilicon' name='tag' color='grey' />
                    <Text style={styles.iconText}>
                        {this.props.tag}
                    </Text>
                </View>

                <View style={styles.bottomCardContainer}>
                    <View style={styles.iconContainer}>
                        <Icon type='evilicon' name='location' color='grey' />
                        <Text style={styles.iconText}>
                            {this.props.location}
                        </Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon type='evilicon' name='calendar' color='grey' />
                        <Text style={styles.iconText}>
                            {this.props.date}
                        </Text>
                    </View>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    bottomCardContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    iconText: {
        fontFamily: 'Kanit-Regular',
        color: 'grey'
    },
    title: {
        fontSize: 16,
        fontFamily: 'Kanit-Regular',
        // marginBottom: 10
    },
    author: {
        fontSize: 15,
        fontFamily: 'Kanit-Regular',
        color: Constants.PRIMARY_COLOR
    },
    block: {
        borderRadius: 10,
    }

})