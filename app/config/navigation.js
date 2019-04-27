import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'
import CampusScreen from '../screens/HomeScreen/CampusScreen'
import NewsScreen from '../screens/HomeScreen/NewsScreen'
import LoadingScreen from '../screens/LoadingScreen'
import PostScreen from '../screens/PostScreen'

import ProfileScreen from '../screens/ProfileScreen'

import React from 'react';

import { Icon } from 'react-native-elements';

import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

const HomeStack = createStackNavigator({
    Campus: {
        screen: CampusScreen
    },
    News: {
        screen: NewsScreen
    },
}, {
        initialRouteName: 'News',
        headerMode: 'none',
    }
);

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
    },
}, {
        initialRouteName: 'Login',
        headerMode: 'none',
    }
);

const MainTab = createBottomTabNavigator({
    Home: HomeStack,
    Post: {
        screen: PostScreen
    },
    Profile: {
        screen: ProfileScreen
    },
},
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Icon;
                let iconName, iconType;
                if (routeName === 'Home') {
                    iconType = 'material-community'
                    iconName = `home${focused ? '' : '-outline'}`
                } else if (routeName === 'Post') {
                    iconType = 'material-community'
                    iconName = `checkbox-multiple-blank${focused ? '' : '-outline'}`
                }
                else if (routeName === 'Profile') {
                    iconType = 'material'
                    iconName = `person${focused ? '' : '-outline'}`
                }
                return <IconComponent type={iconType} name={iconName} size={27} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    })

export default createAppContainer(createSwitchNavigator(
    {
        Loading: {
            screen: LoadingScreen
        },
        Auth: {
            screen: AuthStack
        },
        Main: {
            screen: MainTab
        },
    }
));
