import { connect } from 'react-redux';
import ProfileView from './ProfileView';
import { getProfile, followingUser } from '../../reducers/ProfileReducer/actions';

const mapStateToProps = state => {
    const { isLoading, error, logged, user } = state.authReducer;
    const { profile, completed, loading } = state.profileReducer
    return {
        isLogoutLoading: isLoading,
        logged: logged,
        user: user,
        profile: profile,
        completed: completed,
        followingLoading: loading
    }
}

const mapDispatchToProps = {
    getProfile: getProfile,
    followingUser: followingUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);