import React from 'react';
import styles from './style.js';

import { Image, Icon, Divider, ListItem, Avatar, Header, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from '../../../config/constants'

class DetailView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            myComment: '',
            liked: false,
            comments: [],
            loaded: false
        };
    }

    getProfile = (id) => {
        this
            .props
            .navigation
            .push('Profile', { id });
    };

    componentDidMount() {
        const { getArticle } = this.props;
        getArticle(this.props.navigation.state.params.id);
    }


    componentWillReceiveProps(nextProps) {
        if (this.state.loaded != nextProps.completed) {
            const { article, user } = nextProps;
            var found = false;
            if (article.rating)
                for (var i = 0; i < article.rating.length; i++) {
                    if (article.rating[i].user_id == user.user_id) {
                        found = true;
                        break;
                    }
                }
            this.setState({
                liked: found,
                comments: article.comments ? article.comments : [],
                loaded: true,
            });
        }
        // if (this.props.navigation.state.params.id != nextProps.navigation.state.params.id) {
        //     this.setState({
        //         loaded: false,
        //     });
        //     const { getArticle } = this.props;
        //     getArticle(this.props.navigation.state.params.id);
        // }
    }

    updateMyCommentText = myComment => {
        this.setState({ myComment });
    };

    postComment = () => {
        const { myComment } = this.state
        const { postComment, user } = this.props
        if (myComment != '') {
            postComment(this.props.navigation.state.params.id, myComment)
            this.setState(prevState => ({
                comments: [{
                    msg: myComment,
                    user_id: user.user_id,
                    displayName: user.displayName,
                    img: user.img
                }, ...prevState.comments],
                myComment: '',
            }))
        }
    }

    postFavorite = () => {
        const { liked } = this.state
        this.props.postFavorite(this.props.navigation.state.params.id)
        this.setState({
            liked: !liked,
        })
    }

    render() {

        const { myComment, liked, comments } = this.state
        const { completed, loadingFavorite, user, article, loadingComment } = this.props
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={50} style={styles.container} behavior="padding" enabled>


                <ScrollView >

                    <Header
                        containerStyle={{ borderBottomWidth: 0 }}
                        backgroundColor={Constants.SECONDARY_COLOR}
                        leftComponent={
                            <Icon
                                type='ionicon'
                                name={'ios-arrow-back'}
                                color={Constants.WHITE_COLOR}
                                onPress={() => this.props.navigation.navigate("News")}
                            />
                        }
                        centerComponent={
                            <Text style={styles.headerTitle}>
                                DETAIL
                        </Text>
                        }
                        rightComponent={
                            loadingFavorite || !completed
                                ?
                                <ActivityIndicator color={Constants.WHITE_COLOR} />
                                :
                                <Icon
                                    type='ionicon'
                                    name={!liked ? 'md-heart-empty' : 'md-heart'}
                                    size={29}
                                    color={Constants.WHITE_COLOR}
                                    onPress={() => this.postFavorite()}
                                />
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

                                    <TouchableOpacity onPress={() => this.getProfile(article.author.user_id)}>
                                        <View style={styles.iconContainer}>
                                            <Avatar
                                                size={37}
                                                rounded
                                                source={{
                                                    uri: article.author.img,
                                                }}
                                            />
                                            <Text style={styles.author}>
                                                {article.author.displayName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.topCardContainer}>
                                        <View style={styles.iconContainer}>
                                            <Icon type='evilicon' name='tag' color='grey' />
                                            <Text style={styles.iconText}>
                                                {article.tag ? article.tag.join(", ") : ''}
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
                                            uri: user.img,
                                        }}
                                    />
                                    <View style={{
                                        paddingLeft: 17, width: 'auto', flex: 1,
                                    }}>
                                        <Text style={styles.myCommentName}>
                                            {user.displayName}
                                        </Text>
                                        <View style={styles.commentButton}>
                                            <TextInput
                                                autoCorrect={false}
                                                value={myComment}
                                                onChangeText={this.updateMyCommentText}
                                                placeholder='Type here...'
                                                style={myComment == '' ? styles.textInput : styles.textInputEdited}
                                            />
                                            {
                                                !loadingComment ? <Icon
                                                    name='ios-send'
                                                    type='ionicon'
                                                    color={myComment == '' ? 'grey' : Constants.SECONDARY_COLOR}
                                                    onPress={() => this.postComment()}
                                                /> : <ActivityIndicator color={Constants.PRIMARY_COLOR} />
                                            }

                                        </View>

                                    </View>
                                </View>
                                {
                                    comments ?
                                        comments.map((l, i) => (
                                            <ListItem
                                                onPress={() => this.getProfile(l.user_id)}
                                                key={i}
                                                leftAvatar={
                                                    { source: { uri: l.img } }
                                                }
                                                title={l.displayName}
                                                titleStyle={l.user_id == user.user_id ? styles.myComment : styles.otherComment}
                                                subtitle={l.msg}
                                            />
                                        )) : null
                                }
                            </View >

                            : <View />

                    }
                </ScrollView >

            </KeyboardAvoidingView >

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
    user: PropTypes.object.isRequired,
    loadingComment: PropTypes.bool.isRequired,
    errorComment: PropTypes.bool.isRequired,
    postComment: PropTypes.func.isRequired,

};


export default DetailView;
