import React from 'react';
import { Card, Button, Image, Header, Icon, SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import Constants from './../../../config/constants'

import ArticleItem from '../../../components/AriticleItem/index'

class NewsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        const { getArticles, selectedCampus } = this.props;
        getArticles(selectedCampus)
        this.setState({ refreshing: false });
    }

    updateSearch = search => {
        this.setState({ search });
    };

    getDetail = (id) => {
        this
            .props
            .navigation
            .navigate('Detail', { id });
    };

    componentDidMount() {
        const { getArticles, selectedCampus } = this.props;
        getArticles(selectedCampus);
    }

    render() {
        const { selectedCampus, articles, completed } = this.props;
        const { search } = this.state;

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
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    round
                    lightTheme
                    showLoading
                    inputContainerStyle={{ backgroundColor: '#fff' }}
                    leftIconContainerStyle={{ backgroundColor: '#fff' }}
                    containerStyle={{ borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                />
                <View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                        {
                            (completed) ?
                                articles.map((u, i) => {
                                    return (
                                        <ArticleItem
                                            article={u}
                                            event={this.getDetail}
                                            key={u.id}
                                        />);
                                }) : <View></View>
                        }
                    </ScrollView>
                </View>

            </View>
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
    newsContainer: {

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
