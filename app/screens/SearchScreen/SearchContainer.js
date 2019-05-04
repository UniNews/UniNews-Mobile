import { connect } from 'react-redux';
import SearchView from './SearchView';
import { search } from '../../reducers/SearchReducer/actions';

const mapStateToProps = state => {
    const { loading, result, error, completed } = state.searchReducer;
    return {
        loading: loading,
        result: result,
        error: error,
        completed: completed
    }
}


const mapDispatchToProps = {
    search: search,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);