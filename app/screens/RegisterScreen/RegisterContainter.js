import { connect } from 'react-redux';
import RegisterView from './RegisterView';
import { signupByEmail, clearState } from '../../reducers/AuthReducer/actions';


const mapStateToProps = state => {
    const { isLoading, error, registered } = state.authReducer;
    return {
        loading: isLoading,
        error: error,
        registered: registered
    }
}


const mapDispatchToProps = {
    signupByEmail: signupByEmail,
    clearState: clearState
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);