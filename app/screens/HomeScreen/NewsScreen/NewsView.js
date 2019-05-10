import React from 'react';
import { Header, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Constants from './../../../config/constants'

import ArticleItem from '../../../components/AriticleItem/index'

class NewsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        const { getArticles, selectedCampus } = this.props;
        getArticles(selectedCampus)
        this.setState({ refreshing: false });
    }

    getDetail = (id) => {
        // this
        //     .props
        //     .navigation
        //     .navigate('Detail', { id });
        this.props.navigation.navigate({
            routeName: 'Detail',
            params: {
                id: id,
            },
            key: id
        });
    };

    componentWillReceiveProps(nextProps) {
        const { getArticles, selectedCampus } = this.props;
        if (nextProps.selectedCampus != selectedCampus) {
            getArticles(nextProps.selectedCampus);
        }
    }

    componentDidMount() {
        const { getArticles, selectedCampus } = this.props;
        getArticles(selectedCampus);
    }

    render() {
        const { selectedCampus, articles, completed } = this.props;

        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={Constants.SECONDARY_COLOR}
                    leftComponent={
                        <Icon
                            underlayColor='transparent'
                            type='ionicon'
                            name={'ios-archive'}
                            color={Constants.WHITE_COLOR}
                            size={27}
                            onPress={() => this.props
                                .navigation
                                .navigate('Campus')}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerTitle}>
                            {selectedCampus.toUpperCase()}
                        </Text>
                    }
                    rightComponent={
                        <Icon
                            underlayColor='transparent'
                            type='ionicon'
                            name={'md-add-circle'}
                            size={29}
                            color={Constants.WHITE_COLOR}
                            onPress={() => this.props
                                .navigation
                                .navigate('AddPost')}
                        />
                    }
                />
                {
                    (completed) ?
                        articles.length > 0 ?
                            <View style={{ paddingBottom: 100 }}>
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this._onRefresh}
                                        />
                                    }>
                                    {
                                        articles.map((u, i) => {
                                            return (
                                                <ArticleItem
                                                    article={u}
                                                    event={this.getDetail}
                                                    key={u.id}
                                                />)
                                        })
                                    }
                                </ScrollView>
                            </View>
                            :
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                                <Text style={styles.refreshText} onPress={this._onRefresh}>
                                    Something went wrong. press here to try again.
                                  </Text>
                            </View>
                        :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <ActivityIndicator
                                size={'large'}
                                style={styles.activityIndicator} />
                        </View>
                }
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Kanit-Regular'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    refreshText: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
        textAlignVertical: "center",
        fontFamily: 'Kanit-Regular',
    }
});

NewsView.propTypes = {
    completed: PropTypes.bool.isRequired,
    getArticles: PropTypes.func.isRequired,
    articles: PropTypes.array.isRequired,
    // loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
};


export default NewsView;
