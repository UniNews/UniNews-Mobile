import React from 'react';
import { Card, Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import CampusItem from '../../../components/CampusItem'

class CampusView extends React.Component {

    componentDidMount() {
        const { getCampus } = this.props;
        getCampus();
    }

    static navigationOptions = {
        title: 'CAMPUS'
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getNews = (campus) => {
        // this
        //     .props
        //     .navigation
        //     .navigate('News', { campus });
        const { selectCampus } = this.props;
        selectCampus(campus);
    };

    render() {
        const { selectedCampus } = this.props;
        return (
            <View style={{ paddingHorizontal: 0 }}>
                {
                    this.props.completed ?
                        (
                            this.props.error ? <Text> ERROR</Text> :
                                <View style={styles.container}>
                                    {this.props
                                        .campus
                                        .map((campus, i) => (
                                            <CampusItem campus={campus} focused={campus.name === selectedCampus} key={i} event={this.getNews} />
                                        ))}
                                </View>

                        ) :
                        <Text> ERROR</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

CampusView.propTypes = {
    selectedCampus: PropTypes.string.isRequired,
    selectCampus: PropTypes.func.isRequired,
    getCampus: PropTypes.func.isRequired,
    campus: PropTypes.array.isRequired,
    completed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
};


export default CampusView;
