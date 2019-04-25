import React from 'react';
import { Header, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
// import { Constants } from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import CampusItem from '../../../components/CampusItem'
import Constants from '../../../config/constants'

class CampusView extends React.Component {

    componentDidMount() {
        const { getCampus } = this.props;
        getCampus();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentCampus !== this.props.currentCampus) {
            console.log("CALLED")
            this.setState({ selectedCampus: nextProps.currentCampus });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedCampus: '',
            isCampusChanged: false
        };
    }

    getNews = (campus) => {
        const { changeCampus } = this.props;
        changeCampus(campus)
    }

    selectCampus = (campus) => {
        // this
        //     .props
        //     .navigation
        //     .navigate('News', { campus });
        const { currentCampus } = this.props;
        //             changeCampus(campus);

        if (campus !== currentCampus) {
            this.setState({
                selectedCampus: campus,
                isCampusChanged: true
            });
        } else {
            this.setState({
                selectedCampus: campus,
                isCampusChanged: false
            });
        }
    };

    render() {
        const { isCampusChanged, selectedCampus } = this.state;
        return (
            <View style={{ paddingHorizontal: 0 }}>
                <Header
                    backgroundColor={Constants.SECONDARY_COLOR}
                    leftComponent={
                        <Icon
                            type='ionicon'
                            name={'ios-arrow-back'}
                            color={Constants.WHITE_COLOR}
                        />
                    }
                    centerComponent={
                        <Text style={styles.headerTitle}>
                            SELECT CAMPUS
                        </Text>
                    }
                    rightComponent={
                        <Icon
                            type='ionicon'
                            name={isCampusChanged ? 'ios-arrow-dropright-circle' : 'ios-arrow-dropright'}
                            size={29}
                            color={Constants.WHITE_COLOR}
                            onPress={() => this.getNews(selectedCampus)}
                        />
                    }
                />
                <Text>
                    {isCampusChanged ? "CHANGE" : "NOT"} {this.state.selectedCampus}
                </Text>
                {
                    this.props.completed ?
                        (
                            this.props.error ? <Text> ERROR</Text> :
                                <View style={styles.container}>
                                    {this.props
                                        .campus
                                        .map((campus, i) => (
                                            <CampusItem campus={campus} focused={campus.name === selectedCampus} key={i} event={this.selectCampus} />
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
        // paddingTop: Constants.statusBarHeight,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Kanit-Regular'
    }
});

CampusView.propTypes = {
    currentCampus: PropTypes.string.isRequired,
    changeCampus: PropTypes.func.isRequired,
    getCampus: PropTypes.func.isRequired,
    campus: PropTypes.array.isRequired,
    completed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
};


export default CampusView;
