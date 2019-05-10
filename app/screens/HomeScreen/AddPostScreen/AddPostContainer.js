import { connect } from 'react-redux';
import AddPostView from './AddPostView';
import { postNews } from '../../../reducers/PostReducer/actions';

// import { getCampus, selectCampus } from '../../../reducers/CampusReducer/actions';

const mapStateToProps = state => {
    const { selectedCampus } = state.campusReducer;
    const { loading, error, completed } = state.postReducer;
    return {
        selectedCampus: selectedCampus,
        loading: loading,
        error: error,
        completed: completed
    }
};

const mapDispatchToProps = {
    postNews: postNews
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostView);