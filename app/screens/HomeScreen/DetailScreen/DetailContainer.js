import { connect } from 'react-redux';
import DetailView from './DetailView';
import { getArticle } from '../../../reducers/DetailReducer/actions';
import { postFavorite } from '../../../reducers/FavoriteReducer/actions'
import { postComment } from '../../../reducers/CommentReducer/actions'

const mapStateToProps = state => {
    return {
        loading: state.detailReducer.loading,
        article: state.detailReducer.article,
        error: state.detailReducer.error,
        completed: state.detailReducer.completed,
        loadingFavorite: state.favoriteReducer.loading,
        errorFavorite: state.favoriteReducer.error,
        user: state.profileReducer.profile,
        // completedFavorite: state.favoriteReducer.completed,
        loadingComment: state.commentReducer.loading,
        errorComment: state.favoriteReducer.error,
        // completedFavorite: state.favoriteReducer.completed,
    }
};

const mapDispatchToProps = {
    postFavorite: postFavorite,
    getArticle: getArticle,
    postComment: postComment
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
