import { connect } from 'react-redux';
import LoadingView from './LoadingView';
import { autoLogin } from '../../reducers/AuthReducer/actions';


const mapStateToProps = state => {
    const { isLoading, error } = state.authReducer;
    return {
        isLoading: isLoading,
        error: error,
    }
}

const mapDispatchToProps = {
    autoLogin: autoLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);