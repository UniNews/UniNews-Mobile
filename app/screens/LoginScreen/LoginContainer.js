import { connect } from 'react-redux';
import LoginView from './LoginView';
import { loginByEmail, clearState, loginByFacebook, loginByGoogle } from '../../reducers/AuthReducer/actions';


const mapStateToProps = state => {
    const { isLoading, error, logged } = state.authReducer;
    return {
        isLoading: isLoading,
        error: error,
        logged: logged
    }
}


const mapDispatchToProps = {
    loginByEmail: loginByEmail,
    clearState: clearState,
    loginByFacebook: loginByFacebook,
    loginByGoogle: loginByGoogle
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginView);