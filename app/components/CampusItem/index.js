import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { Card, Icon } from 'react-native-elements';


const CampusItem = ({ campus, focused, event }) => (
    <TouchableOpacity onPress={() => event(campus.name)} style={
        styles.container
    }>
        <Card style={styles.block}
            containerStyle={styles.block}
        >
            <View style={styles.iconContainer}>
                <Icon
                    type={campus.iconType}
                    name={focused ? campus.iconName : campus.iconName + '-outline'}
                    size={45}
                    color={focused ? 'tomato' : 'black'}
                />
            </View>
            <Text style={styles.blockText}>
                {campus.name}
            </Text>
        </Card >
    </TouchableOpacity >


);

CampusItem.propTypes = {
    campus: PropTypes.object.isRequired,
    focused: PropTypes.bool.isRequired,
    event: PropTypes.func.isRequired,
};

export default CampusItem;
