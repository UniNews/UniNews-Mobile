import { connect } from 'react-redux';
import NewsView from './NewsView';

import { getArticles } from '../../../reducers/NewsReducer/actions';

const mapStateToProps = state => {
    const { loading, articles, error, completed } = state.newsReducer;
    return {
        loading: loading,
        articles: articles,
        error: error,
        completed: completed,
    }
};

const mapDispatchToProps = {
    getArticles: getArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);