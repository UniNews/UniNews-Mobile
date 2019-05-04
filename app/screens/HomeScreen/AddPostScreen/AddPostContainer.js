import { connect } from 'react-redux';
import AddPostView from './AddPostView';
// import { getCampus, selectCampus } from '../../../reducers/CampusReducer/actions';

const mapStateToProps = state => {
    // const { selectedCampus, campus, completed, loading, error } = state.campusReducer;
    return {
        // currentCampus: selectedCampus,
        // campus: campus,
        // completed: completed,
        // loading: loading,
        // error: error,
    }
};

const mapDispatchToProps = {
    // getCampus: getCampus,
    // changeCampus: selectCampus
};

export default (AddPostView);
