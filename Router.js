import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, View } from 'react-native';

import { HomeIcon, NewsIcon, MoreIcon } from './src/components/common/TabIcons';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';

import FirstTime from './src/components/launch/FirstTime';
import LoginScreen from './src/components/launch/LoginScreen';
import RegisterScreen from './src/components/launch/RegisterScreen';
import Home from "./src/components/home/Home";
import ContactDurie from './src/components/home/ContactDurie';
import News from "./src/components/news/News";
import NewsItemView from "./src/components/news/NewsItemView";
import More from "./src/components/more/More";
import NewsAdmin from './src/components/more/NewsAdmin';
import ItemsAdmin from './src/components/more/ItemsAdmin';
import HelpAdmin from './src/components/more/HelpAdmin';
import ConsultancyAdmin from './src/components/more/ConsultancyAdmin';
import ProfileScreen from './src/components/more/ProfileScreen';
import Consultancy from './src/components/more/Consultancy';
import Help from './src/components/more/Help';
import About from './src/components/more/About';
import LanguageScreen from './src/components/more/LanguageScreen';
import DonateScreen from './src/components/more/DonateScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = () => {
    const [state, setState] = useState({
        isIn: null,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('Logged in user:', user);
                setState(prevState => ({ ...prevState, isIn: true }));
            } else {
                console.log('User is logged out');
                setState(prevState => ({ ...prevState, isIn: false }));
            }
        });

        return () => unsubscribe();
    }, []);

    const { isIn } = state;

    if (isIn === null) {
        // Display splash logo occupying full screen
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('./assets/splash.png')} // Replace with your splash logo image source
                    style={{ width: '100%', height: '100%', resizeMode: 'center' }}
                />
            </View>
        );
    } else if (isIn) {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={'HomeTab' || 'Home'}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color }) => {
                            if (route.name === 'NewsTab') {
                                return <NewsIcon focused={focused} />;
                            } else if (route.name === 'HomeTab') {
                                return <HomeIcon focused={focused} />;
                            } else if (route.name === 'MoreTab') {
                                return <MoreIcon focused={focused} />;
                            }
                        },
                        tabBarStyle: {
                            backgroundColor: '#fff',
                            borderTopWidth: 0.5,
                            borderTopColor: '#ffffed',
                            elevation: 1,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                        },
                        tabBarActiveTintColor: 'black',
                        tabBarInactiveTintColor: 'lightgray',
                        tabBarShowLabel: false,
                    })}

                >
                    <Tab.Screen
                        name="NewsTab"
                        component={NewsStack}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="HomeTab"
                        component={HomeStack}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="MoreTab"
                        component={MoreStack}
                        options={{ headerShown: false }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="FirstTime">
                    <Stack.Screen
                        name="FirstTime"
                        component={FirstTime}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTintColor: '#402F21',
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name="ContactDurie"
                component={ContactDurie}
                options={({ route }) => ({
                    headerTintColor: '#fff',
                    headerStyle: {
                      backgroundColor: '#7a7',
                    },
                    headerTitleAlign: 'center',
                    // headerBackTitleVisible: true,
                    headerTitle: `${route.params?.title || 'Err: Name not Found'}`,
                  })}
            />

        </Stack.Navigator>
    );
};

const NewsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="News"
                component={News}
                options={{
                    headerTintColor: '#402F21',
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name="NewsItem"
                component={NewsItemView}
                options={{
                    headerTitle: 'News Item View... from router',
                }}
            />
        </Stack.Navigator>
    );
};

const MoreStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="More"
                component={More}
                options={{
                    headerTintColor: '#050505',
                    headerStyle: {
                        // backgroundColor: '#FFF705',
                    },
                    headerTitleStyle: {
                        // fontFamily: 'emirates',
                        fontSize: 22,
                        color: '#050505',
                    },
                    headerBackTitleVisible: true,
                    headerTitle: '',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="NewsAdmin"
                component={NewsAdmin}
                options={{ headerTitle: 'News Admin' }}
            />
            <Stack.Screen
                name="ItemsAdmin"
                component={ItemsAdmin}
                options={{ headerTitle: 'Item Admin' }}
            />
            <Stack.Screen
                name="HelpAdmin"
                component={HelpAdmin}
                options={{ headerTitle: 'Help Admin' }}
            />
            <Stack.Screen
                name="ConsultancyAdmin"
                component={ConsultancyAdmin}
                options={{ headerTitle: 'Consultancy Admin' }}
            />
            <Stack.Screen
                name="UserProfile"
                component={ProfileScreen}
                options={{ headerTitle: 'User Profile' }}
            />
            <Stack.Screen
                name="Language"
                component={LanguageScreen}
                options={{ headerTitle: 'Language' }}
            />
            <Stack.Screen
                name="Donate"
                component={DonateScreen}
                options={{ headerTitle: 'Donate' }}
            />
            <Stack.Screen
                name="Consultancy"
                component={Consultancy}
                options={{ headerTitle: 'My Admirers' }}
            />
            <Stack.Screen
                name="Help"
                component={Help}
                options={{ headerTitle: 'Help/Inquiries' }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{ headerTitle: 'About App' }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const styles = {
    tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: '#ffffed',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabBarLabelFocusedLeft: {
        position: 'absolute',
        left: '-35%',
        top: 55, // Adjust this value to position the label properly
        fontSize: 12,
        color: 'black',
        textAlign: 'left',
        paddingLeft: 10,
    },
    tabBarLabelFocusedRight: {
        position: 'absolute',
        right: '-35%',
        top: 55, // Adjust this value to position the label properly
        fontSize: 12,
        color: 'black',
        textAlign: 'right',
        paddingRight: 10,
    },
    tabBarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 40,
    },
};

export default Router;
