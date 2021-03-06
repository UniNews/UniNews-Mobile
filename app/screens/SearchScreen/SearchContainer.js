import { connect } from 'react-redux';
import SearchView from './SearchView';
import { search } from '../../reducers/SearchReducer/actions';

const mapStateToProps = state => {
    const { loading, result, error, completed, searchedText } = state.searchReducer;
    return {
        loading: loading,
        result: result,
        error: error,
        completed: completed,
        searchedText: searchedText
    }
}


const mapDispatchToProps = {
    search: search,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);