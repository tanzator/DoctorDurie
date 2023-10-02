import React from 'react';
import { View, Image } from 'react-native';
import { Ionicons, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome, Feather, Octicons } from '@expo/vector-icons';

//file imports
// import sponsorLogo from "../../../assets/images/sponsorLogo.png";

export const HomeIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <Entypo name="home" size={26} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};

export const clubs = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <Entypo name="sports-club" size={25} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};

export const NewsIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <MaterialCommunityIcons name="google-analytics" size={25} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};

export const organizationIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <Octicons name="organization" size={20} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};

export const giveIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <MaterialCommunityIcons name="heart-plus-outline" size={24} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};

export const MoreIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <MaterialCommunityIcons name="more" size={25} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};

export const sponsor = () => {
    return (
        <View style={styles.containerStyle}>
            <Image source={sponsorLogo} style={{ height: 29, width: 29 }}/>
        </View>
    );
};

export const fantasy = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <Ionicons name="ios-shirt" size={24} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};

export const FacebookIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <FontAwesome name="facebook-square" size={24} color={focused ? '#000' : '#A9A9A9'} />
        </View>
    );
};

export const TweeterIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <FontAwesome name="twitter-square" size={24} color={focused ? '#000' : '#A9A9A9'} />
        </View>
    );
};

export const InstagramIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <FontAwesome name="instagram-square" size={24} color={focused ? '#000' : '#A9A9A9'} />
        </View>
    );
};

export const PhoneIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <FontAwesome name="phone-square" size={24} color={focused ? '#000' : '#A9A9A9'} />
        </View>
    );
};

export const LocationIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <Ionicons name="location-sharp" size={24} color={focused ? '#000' : '#A9A9A9'} />
        </View>
    );
};



export const ProfileIcon = ({focused}) => {
    return (
        <View style={styles.containerStyle}>
            <Ionicons name="person" size={24} color={focused ? '#000' : '#A9A9A9' } />
        </View>
    );
};


const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        width: 30,
        height: 30,
    }
};