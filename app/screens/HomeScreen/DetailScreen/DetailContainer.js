import { connect } from 'react-redux';
import DetailView from './DetailView';
import { getArticle } from '../../../reducers/DetailReducer/actions';


const mapStateToProps = state => {
    const { loading, article, error, completed } = state.detailReducer;
    return {
        loading: loading,
        article: article,
        error: error,
        completed: completed
    }
};

const mapDispatchToProps = {
    getArticle: getArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
