import { connect } from 'react-redux';
import ChangeProfileView from './ChangeProfileView';

import { logoutUser } from '../../reducers/AuthReducer/actions';
import { updateProfile } from '../../reducers/ProfileReducer/actions';


const mapStateToProps = state => {
    const { isLoading, error, logged, user } = state.authReducer;
    const { profile, loading } = state.profileReducer
    return {
        isLogoutLoading: isLoading,
        logged: logged,
        user: user,
        profile: profile,
        isProfileLoading: loading
    }
}

const mapDispatchToProps = {
    logoutUser: logoutUser,
    updateProfile: updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfileView);