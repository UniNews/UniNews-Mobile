import { connect } from 'react-redux';
import LoginView from './LoginView';
import { loginByEmail, clearState } from '../../reducers/AuthReducer/actions';


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
    clearState: clearState
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginView);