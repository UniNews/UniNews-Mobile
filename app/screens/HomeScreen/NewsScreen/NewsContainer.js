import { connect } from 'react-redux';
import NewsView from './NewsView';

import { getArticles } from '../../../reducers/NewsReducer/actions';

const mapStateToProps = state => {
    const { loading, articles, error, completed } = state.newsReducer;
    const { selectedCampus } = state.campusReducer;
    const { profile } = state.profileReducer;

    return {
        // loading: loading,
        articles: articles,
        error: error,
        completed: completed,
        selectedCampus: selectedCampus,
        profile: profile
    }
};

const mapDispatchToProps = {
    getArticles: getArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);