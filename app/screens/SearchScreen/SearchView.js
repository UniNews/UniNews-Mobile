import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { Header, Button, SearchBar } from 'react-native-elements';
import constants from './../../config/constants';
import ArticleItem from '../../components/AriticleItem'

import PropTypes from 'prop-types';

class SearchView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
        this.typingTimeout = 0
    }

    updateSearch = text => {
        const { search } = this.props;
        const { searchText } = this.state;

        this.setState({ searchText: text })
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        this.typingTimeout = setTimeout((event) => search(searchText), 500)
    };


    render() {
        const { searchText } = this.state;
        const { loading, result } = this.props;

        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={constants.SECONDARY_COLOR}
                    centerComponent={
                        <Text style={styles.headerTitle}>
                            SEARCH NEWS
                        </Text>
                    }
                />
                <SearchBar
                    placeholder="Title, Author, Tag"
                    onChangeText={this.updateSearch}
                    value={searchText}
                    round
                    lightTheme
                    inputContainerStyle={{ backgroundColor: '#fff' }}
                    leftIconContainerStyle={{ backgroundColor: '#fff' }}
                    containerStyle={{ backgroundColor: constants.SECONDARY_COLOR, borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                />

                {
                    loading ?
                        <ActivityIndicator
                            size={40}
                            style={styles.activityIndicator} />
                        :
                        result.map((u, i) => {
                            return (
                                <ArticleItem
                                    article={u}
                                    // event={this.getDetail}
                                    key={u.id}
                                />);
                        })
                }
                {/* <Button
                    title="TEST"
                    onPress={() => { this.props.search("Asian") }} /> */}

            </View>

        );
    }

}

SearchView.propTypes = {
    loading: PropTypes.bool.isRequired,
    result: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    search: PropTypes.func.isRequired,
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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SearchView;
