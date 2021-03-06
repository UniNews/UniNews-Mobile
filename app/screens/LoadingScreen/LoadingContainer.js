import { connect } from 'react-redux';
import LoadingView from './LoadingView';
import { autoLogin } from '../../reducers/AuthReducer/actions';
import { getProfile } from '../../reducers/ProfileReducer/actions';

const mapStateToProps = state => {
    const { isLoading, error, logged, user } = state.authReducer;
    const { completed } = state.profileReducer
    return {
        isLoading: isLoading,
        error: error,
        logged: logged,
        getProfileCompleted: completed,
        user: user,
    }
}

const mapDispatchToProps = {
    autoLogin: autoLogin,
    getProfile: getProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);