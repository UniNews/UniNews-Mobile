// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen'
import CampusScreen from '../screens/HomeScreen/CampusScreen'
import NewsScreen from '../screens/HomeScreen/NewsScreen'

import PostScreen from '../screens/PostScreen'

import ProfileScreen from '../screens/ProfileScreen'

import React from 'react';

import { Icon } from 'react-native-elements';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const HomeStack = createStackNavigator({
    Campus: {
        screen: CampusScreen
    },
    News: {
        screen: NewsScreen
    },
}, {
        initialRouteName: 'Campus',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerStyle: {
                elevation: 0,
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                paddingTop: 30,
                fontWeight: 'bold',
            },
        },
        // headerMode: 'none',
    }
);

export default createAppContainer(createBottomTabNavigator(
    {
        Home:
            HomeStack
        ,
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
    }
));
