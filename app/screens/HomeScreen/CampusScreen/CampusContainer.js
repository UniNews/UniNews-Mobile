import { connect } from 'react-redux';
import CampusView from './CampusView';
import { getCampus, selectCampus } from '../../../reducers/CampusReducer/actions';

const mapStateToProps = state => {
    const { selectedCampus, campus, completed, loading, error } = state.campusReducer;
    return {
        selectedCampus: selectedCampus,
        campus: campus,
        completed: completed,
        loading: loading,
        error: error,
    }
};

const mapDispatchToProps = {
    getCampus: getCampus,
    selectCampus: selectCampus
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusView);
