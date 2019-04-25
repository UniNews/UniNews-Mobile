import { connect } from 'react-redux';
import LoadingView from './LoadingView';
import { loginByEmail } from '../../reducers/AuthReducer/actions';


const mapStateToProps = state => {
    const { isLoading, error, isAuthenticated } = state.authReducer;
    return {
        isLoading: isLoading,
        error: error,
        isAuthenticated: isAuthenticated
    }
}

const mapDispatchToProps = {
    loginByEmail: loginByEmail,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);