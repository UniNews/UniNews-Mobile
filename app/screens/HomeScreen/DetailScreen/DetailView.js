import React from 'react';
import styles from './style.js';

import { Image, Icon, Divider, ListItem, Avatar, Header, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Constants from '../../../config/constants'

class DetailView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            myComment: '',
            titleError: '',
            favoriteIconName: 'md-heart-empty'
        };
    }

    componentDidMount() {
        const { getArticle } = this.props;
        getArticle(this.props.navigation.state.params.id);
    }

    updateMyCommentText = myComment => {
        this.setState({ myComment });
    };

    postFavorite = () => {
        const { favoriteIconName } = this.state
        this.props.postFavorite(this.props.navigation.state.params.id)
        this.setState({
            favoriteIconName: favoriteIconName === 'md-heart-empty' ? 'md-heart' : 'md-heart-empty',
        })

    }

    render() {

        const { myComment, favoriteIconName } = this.state
        const { article, completed, loadingFavorite } = this.props
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView >

                    <Header
                        containerStyle={{ borderBottomWidth: 0 }}
                        backgroundColor={Constants.SECONDARY_COLOR}
                        leftComponent={
                            <Icon
                                type='ionicon'
                                name={'ios-arrow-back'}
                                color={Constants.WHITE_COLOR}
                                onPress={() => this.props.navigation.goBack()}
                            />
                        }
                        centerComponent={
                            <Text style={styles.headerTitle}>
                                DETAIL
                        </Text>
                        }
                        rightComponent={
                            !loadingFavorite ?
                                <Icon
                                    type='ionicon'
                                    name={favoriteIconName}
                                    size={29}
                                    color={Constants.WHITE_COLOR}
                                    onPress={() => this.postFavorite()}
                                /> :
                                <ActivityIndicator color={Constants.WHITE_COLOR} />
                        }
                    />
                    {
                        completed ?
                            <View >
                                <Image
                                    source={{ uri: article.imgs }}
                                    style={{ width: 'auto', height: 250 }}
                                />

                                <View style={{ padding: 20 }}>
                                    <Text style={styles.title}>
                                        {article.title}
                                    </Text>
                                    <Text style={styles.author}>
                                        {article.author}
                                    </Text>

                                    <View style={styles.topCardContainer}>
                                        <View style={styles.iconContainer}>
                                            <Icon type='evilicon' name='tag' color='grey' />
                                            <Text style={styles.iconText}>
                                                {article.tag}
                                            </Text>
                                        </View>
                                        <View style={styles.iconContainer}>
                                            <Icon type='evilicon' name='calendar' color='grey' />
                                            <Text style={styles.iconText}>
                                                {article.timeStamp.split(" ")[0]}
                                            </Text>
                                        </View>
                                    </View>
                                    <Divider style={{ marginTop: 20, backgroundColor: 'grey' }} />

                                    <Text style={styles.description}>
                                        {article.description}
                                    </Text>

                                    <Divider style={{ marginTop: 20, backgroundColor: 'grey' }} />


                                </View>

                                <Text style={styles.commentHeader}>
                                    Comments
                        </Text>
                                <View style={styles.myCommentContainer}>

                                    <Avatar
                                        rounded
                                        size={39}
                                        source={{
                                            uri:
                                                'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/53160241_1756046387829287_3407601055209357312_n.jpg?_nc_cat=1&_nc_ht=scontent.fbkk22-1.fna&oh=8ad8689ea458798f60dc5f42f2b144c1&oe=5D631905',
                                        }}
                                    />
                                    <View style={{
                                        paddingLeft: 17, width: 'auto', flex: 1,
                                    }}>
                                        <Text style={styles.myCommentName}>
                                            Mond
                                </Text>
                                        <View style={styles.commentButton}>
                                            <TextInput
                                                value={myComment}
                                                onChangeText={this.updateMyCommentText}
                                                placeholder='Type here...'
                                                style={myComment == '' ? styles.textInput : styles.textInputEdited}
                                            />
                                            <Icon
                                                name='ios-send'
                                                type='ionicon'
                                                color={myComment == '' ? 'grey' : Constants.SECONDARY_COLOR}
                                            />
                                        </View>

                                    </View>


                                </View>
                                {
                                    article.comments.map((l, i) => (
                                        <ListItem
                                            key={i}
                                            leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                                            title='Nong Jamie'
                                            titleStyle={styles.comment}
                                            subtitle={l.msg}
                                        />
                                    ))
                                }
                            </View >

                            : <View />

                    }
                </ScrollView >

            </KeyboardAvoidingView>

        );
    }
}


DetailView.propTypes = {
    article: PropTypes.object.isRequired,
    getArticle: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    postFavorite: PropTypes.func.isRequired,
    loadingFavorite: PropTypes.bool.isRequired,
    errorFavorite: PropTypes.bool.isRequired,
    completedFavorite: PropTypes.bool.isRequired,
};


export default DetailView;
