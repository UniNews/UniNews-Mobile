import React from 'react';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { StyleSheet, View, Text } from 'react-native';


class NewsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',

    },
});

NewsView.propTypes = {
};


export default NewsView;
