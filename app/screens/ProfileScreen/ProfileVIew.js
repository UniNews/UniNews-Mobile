import React from 'react';
import { Avatar, Header, Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ImageBackground, Dimensions, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import Constants from '../../config/constants'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ProfileDetailScreen from './DetailProfileScreen'
import LikeProfileScreen from './PostProfileScreen'
import PostProfileScreen from './PostProfileScreen'
import FollowingProfileScreen from './FollowingProfileScreen'
import userService from '../../services/user'

class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Detail' },
                { key: 'second', title: 'Posts' },
                { key: 'third', title: 'Liked' },
            ],
            isFollowingVisible: false,
            isFollowerVisible: false,
            isRoot: false,

            displayName: '',
            aboutMe: '',
            following: [],
            follower: [],
            posts: [],
            liked: [],
            error: '',
            img: '',

            refreshing: false,
            loading: false,
        }
    }

    _onRefresh = () => {
        const { getProfile, profile } = this.props
        const { isRoot } = this.state
        this.setState({ refreshing: true, loading: true });
        if (isRoot)
            getProfile(profile.user_id)
        else {
            const { id } = this.props.navigation.state.params;
            userService.getProfile(id).then((res) => {
                this.setState({
                    displayName: res.result.displayName,
                    aboutMe: res.result.aboutMe,
                    following: res.result.following ? res.result.following : [],
                    follower: res.result.follower ? res.result.follower : [],
                    posts: res.result.post_detail ? res.result.post_detail : [],
                    liked: res.result.like_detail ? res.result.like_detail : [],
                    error: '',
                    img: res.result.img,
                    isRoot: false,
                    uid: res.result.user_id,
                    loading: false,
                })
            }).catch(err =>
                this.setState({
                    error: 'No user',
                    refreshing: false,
                    loading: false,
                })
            );
        }
        this.setState({ refreshing: false });
    }

    componentWillReceiveProps(nextProps) {
        const { isRoot } = this.state;
        if (isRoot && nextProps.completed && nextProps.profile) {
            this.setState({
                displayName: nextProps.profile.displayName,
                aboutMe: nextProps.profile.aboutMe,
                following: nextProps.profile.following ? nextProps.profile.following : [],
                follower: nextProps.profile.follower ? nextProps.profile.follower : [],
                posts: nextProps.profile.post_detail ? nextProps.profile.post_detail : [],
                liked: nextProps.profile.like_detail ? nextProps.profile.like_detail : [],
                error: '',
                img: nextProps.profile.img,
                isRoot: true,
                uid: nextProps.profile.user_id,

                loading: false,

            });
        }
    }

    componentDidMount() {

        const { profile } = this.props;
        this.setState({ loading: true });
        console.log(this.props.navigation.state.params)
        if (!this.props.navigation.state.params) {
            this.setState({
                displayName: profile.displayName,
                aboutMe: profile.aboutMe,
                following: profile.following ? profile.following : [],
                follower: profile.follower ? profile.follower : [],
                // following: [{
                //     user_id: 'cppbR6T2IDYCSOJuKli8r1FEJD53',
                //     img: "https://firebasestorage.googleapis.com/v0/b/uninews-api.appspot.com/o/default_user.png?alt=media&token=fdfe897b-5019-4fa7-861a-1afcc92b48f2",
                //     displayName: 'pauls',
                //     aboutMe: 'ควยไรเจมมี่'
                // }],
                // follower: [{
                //     user_id: 'eJl6QqogWIhphO9yRV09524BlNw2',
                //     img: "https://firebasestorage.googleapis.com/v0/b/uninews-api.appspot.com/o/default_user.png?alt=media&token=fdfe897b-5019-4fa7-861a-1afcc92b48f2",
                //     displayName: 'god',
                //     aboutMe: 'Cry T_T'
                // }],
                posts: profile.post_detail ? profile.post_detail : [],
                liked: profile.like_detail ? profile.like_detail : [],
                error: '',
                img: profile.img,
                isRoot: true,
                uid: profile.user_id,
                loading: false,
            });
        } else {
            const { id } = this.props.navigation.state.params;
            userService.getProfile(id).then((res) => {

                this.setState({
                    displayName: res.result.displayName,
                    aboutMe: res.result.aboutMe,
                    following: res.result.following ? res.result.following : [],
                    follower: res.result.follower ? res.result.follower : [],
                    posts: res.result.post_detail ? res.result.post_detail : [],
                    liked: res.result.like_detail ? res.result.like_detail : [],
                    error: '',
                    img: res.result.img,
                    isRoot: false,
                    uid: res.result.user_id,
                    loading: false,

                })
            }).catch(err =>
                this.setState({
                    error: 'No user',
                    loading: false,
                },
                )
            );
        }
    }

    getDetail = (id) => {
        this.props.navigation.navigate({
            routeName: 'Detail',
            params: {
                id: id,
            },
            key: id
        });
    };

    followUser = (uid) => {
        const { followingUser } = this.props
        followingUser(uid)
    }

    unfollowuser = (uid) => {
        const { followingUser } = this.props

    }


    getProfile = (id) => {
        this
            .props
            .navigation
            .push('Profile', { id });
    };

    renderFollowing(uid) {
        const { profile } = this.props

        if (profile.user_id == uid) {
            return null
        }
        for (var user in profile.following) {
            var following_uid = profile.following[user].user_id;
            if (following_uid == uid) {
                return < Icon
                    type='entypo'
                    name={'remove-user'}
                    color={Constants.WHITE_COLOR}
                    onPress={() => {
                        this.unfollowuser(uid)
                    }}
                />
            }
        }
        return (
            < Icon
                type='ionicon'
                name={'md-person-add'}
                size={29}
                color={Constants.WHITE_COLOR}
                onPress={() => {
                    this.followUser(uid)
                }}
            />
        );
    }




    render() {
        console.disableYellowBox = true;

        const FirstRoute = () => (
            <ProfileDetailScreen
                displayName={displayName}
                aboutMe={aboutMe}
            />
        );

        const SecondRoute = () => (
            <PostProfileScreen
                articles={posts}
                event={this.getDetail}
            />
        );

        const ThirdRoute = () => (
            <LikeProfileScreen
                articles={liked}
                event={this.getDetail}
            />
        );

        const { isFollowingVisible, isFollowerVisible, isRoot
            , displayName, aboutMe, following,
            follower, posts, liked, error, img,
            uid, loading
        } = this.state
        const { isLogoutLoading, followingLoading } = this.props


        return (

            <View style={styles.container}>
                <FollowingProfileScreen
                    title={"Following"}
                    users={following}
                    isVisible={isFollowingVisible}
                    event={this.getProfile}
                    onBackdropPress={() => {
                        this.setState({
                            isFollowerVisible: false,
                            isFollowingVisible: false
                        })
                    }}
                />

                <FollowingProfileScreen
                    title={"Follower"}
                    users={follower}
                    isVisible={isFollowerVisible}
                    event={this.getProfile}
                    onBackdropPress={() => {
                        this.setState({
                            isFollowerVisible: false,
                            isFollowingVisible: false
                        })
                    }}
                />
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={Constants.SECONDARY_COLOR}
                    leftComponent={
                        isRoot ?
                            null :
                            <Icon
                                type='ionicon'
                                name={'ios-arrow-back'}
                                color={Constants.WHITE_COLOR}
                                onPress={() => {
                                    this.props.navigation.pop();
                                }}
                            />
                    }
                    centerComponent={
                        <Text style={styles.headerTitle}>
                            {displayName}
                        </Text>
                    }
                    rightComponent={
                        !loading && !followingLoading ?
                            isRoot ?
                                isLogoutLoading ? <ActivityIndicator
                                    size={'large'}
                                    style={styles.activityIndicator} />
                                    :
                                    <Icon
                                        type='ionicon'
                                        name={'md-settings'}
                                        size={29}
                                        color={Constants.WHITE_COLOR}
                                        onPress={() => {
                                            this.props.navigation.navigate('ChangeProfile')
                                        }}
                                    />
                                :
                                this.renderFollowing(uid)
                            : <ActivityIndicator color={Constants.WHITE_COLOR} />

                    }
                />
                {
                    <View style={styles.container}>
                        <View >

                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this._onRefresh}
                                    />
                                }>
                                <ImageBackground
                                    source={require('../../assets/imgs/ku-logo.jpg')}
                                    resizeMode='cover'>
                                    <View style={{
                                        paddingTop: 20, paddingHorizontal: 20, paddingBottom: 10, alignItems: 'center',
                                    }}>
                                        <Avatar
                                            size={150}
                                            rounded
                                            source={{
                                                uri: img,
                                            }}
                                            containerStyle={{
                                                borderColor: Constants.SECONDARY_COLOR, borderWidth: 2
                                            }}
                                        />
                                    </View>
                                    <View style={{
                                        paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-around'
                                    }}>
                                        <Button
                                            buttonStyle={{ borderColor: 'white', borderWidth: 1 }}
                                            titleStyle={{ color: 'white' }}
                                            title={`${following.length} Following`}
                                            type="outline"
                                            onPress={() => {
                                                this.setState({ isFollowingVisible: true })
                                            }}
                                        />
                                        <Button
                                            buttonStyle={{ borderColor: 'white', borderWidth: 1 }}
                                            titleStyle={{ color: 'white' }}
                                            title={`${follower.length} Follower`}
                                            type="outline"
                                            onPress={() => {
                                                this.setState({ isFollowerVisible: true })
                                            }}
                                        />
                                    </View>
                                </ImageBackground>
                            </ScrollView>
                        </View>


                        <TabView
                            style={{ flex: 1 }}
                            navigationState={this.state}
                            renderScene={SceneMap({
                                first: FirstRoute,
                                second: SecondRoute,
                                third: ThirdRoute
                            })}
                            renderTabBar={props =>
                                <TabBar
                                    {...props}
                                    labelStyle={{
                                        fontSize: 16,
                                        fontFamily: 'Kanit-Regular',
                                    }}
                                    indicatorStyle={{ backgroundColor: 'white' }}
                                    style={{ backgroundColor: Constants.PRIMARY_COLOR }}
                                />
                            }
                            onIndexChange={index => this.setState({ index })}
                            initialLayout={{ width: Dimensions.get('window').width }}
                        />
                    </View>
                }



            </View >

        );
    }
}

ProfileView.propTypes = {
    isLogoutLoading: PropTypes.bool.isRequired,
    logged: PropTypes.bool.isRequired,
    getProfile: PropTypes.func.isRequired,
    // updateProfile: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    // user: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Kanit-Regular'
    },
    nameText: {
        fontFamily: 'Kanit-Regular',
        color: '#fff',
        fontSize: 50,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProfileView;
