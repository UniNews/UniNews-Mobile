import { connect } from 'react-redux';
import RegisterView from './RegisterView';
import { signupByEmail, clearState } from '../../reducers/AuthReducer/actions';


const mapStateToProps = state => {
    const { isLoading, error, isAuthenticated } = state.authReducer;
    return {
        isLoading: isLoading,
        error: error,
        isAuthenticated: isAuthenticated
    }
}


const mapDispatchToProps = {
    signupByEmail: signupByEmail,
    clearState: clearState
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);