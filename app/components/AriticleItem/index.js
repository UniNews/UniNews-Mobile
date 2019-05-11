/**
 * Created by ggoma on 2016. 11. 22..
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';

import Constants from './../../config/constants';


export default class ArticleItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { article, event } = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => event(article.id)} >
                <Card containerStyle={styles.block}
                    image={{ uri: article.imgs}}>
                    <View style={styles.topCardContainer}>
                        <Text style={styles.title}>
                            {article.title}
                        </Text>

                        {/* <Icon type='ionicon' name='md-heart-empty' color='grey' size={24} /> : */}

                    </View>

                    <Text style={styles.author}>
                        {article.author.displayName}
                    </Text>

                    <View style={styles.middleCardContainer}>
                        <View style={styles.iconContainer}>
                            <Icon type='evilicon' name='tag' color='grey' />
                            <Text style={styles.iconText}>
                                {article.tag ? article.tag.join(", ") : ''}
                            </Text>
                        </View>

                        {/* <View style={styles.iconContainer}>
                            <Icon type='evilicon' name='location' color='grey' />
                            <Text style={styles.iconText}>
                                {article.location}
                            </Text>
                        </View> */}

                    </View>

                    <View style={styles.topCardContainer}>

                        <View style={styles.iconContainer}>
                            <Icon type='evilicon' name='calendar' color='grey' />
                            <Text style={styles.iconText}>
                                {article.timeStamp.split(" ")[0]}
                            </Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon type='evilicon' name='heart' color='grey' />
                            <Text style={styles.iconText}>
                                {article.rating ? article.rating.length : 0} Likes
                    </Text>
                        </View>

                        <View style={styles.iconContainer}>
                            <Icon type='evilicon' name='comment' color='grey' />
                            <Text style={styles.iconText}>
                                {article.comments ? article.comments.length : 0} Comments
                    </Text>


                        </View>

                    </View>
                </Card>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = StyleSheet.create({
    topCardContainer: {
        // marginRight: 20,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    middleCardContainer: {
        flexDirection: 'row'
    },
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