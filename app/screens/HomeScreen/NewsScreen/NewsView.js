import React from 'react';
import { Card, Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    LayoutAnimation
} from 'react-native';
import Constants from './../../../config/constants'

import ArticleItem from '../../../components/AriticleItem/index'

const users = [
    {
        title: 'Best of the best internship ever.',
        author: 'Computer Faculty',
        tag: 'Greek, Nerd',
        location: 'World',
        date: '25 May',
        img: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/45097821_319625285294116_8959150974564302848_n.jpg?_nc_cat=103&_nc_ht=scontent.fbkk2-8.fna&oh=110cc58617887b58673abb38c946a815&oe=5D70412C'
    }, {
        title: 'Come and get your love',
        author: 'Economic Faculty',
        tag: 'Business, Finance',
        location: 'Mar',
        date: '30 May',
        img: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/51193919_2937551282925527_1009368008058994688_o.jpg?_nc_cat=103&_nc_ht=scontent.fbkk2-8.fna&oh=da3568617a96de03cd2c732c5e7270be&oe=5D750FCE'
    }
];

class NewsView extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { getArticles } = this.props;
        getArticles('social');
    }

    render() {
        const { articles } = this.props;

        return (

            <ScrollView style={styles.container}>
                {/* {
                        users.map((u, i) => {
                            return (
                                <ArticleItem
                                    key={i}
                                    title={u.title}
                                    author={u.author}
                                    img={u.img}
                                    tag={u.tag}
                                    date={u.date}
                                    location={u.location}
                                />);
                        })
                    } */}

                {/* {
                    articles.map((u, i) => {
                        return (
                            <Text>
                                u
                            </Text>
                        );
                    })
                } */}

                <Text>
                    {articles}
                </Text>


            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Constants.PRIMARY_COLOR,
        paddingTop: 20
    },
});

NewsView.propTypes = {
    completed: PropTypes.bool.isRequired,
    getArticles: PropTypes.func.isRequired,
    articles: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
};


export default NewsView;
