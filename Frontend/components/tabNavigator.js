import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import home from './home'
import user from './user'
import map from "./map";
import ReceiptTab from './recieptUploader'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const iconOptions = (route, color) => {
    let iconName;

    switch (route.name) {
        case 'Home':
            iconName = 'home';
            break;
        case 'User':
            iconName = 'user';
            break;
        case 'Map':
            iconName = 'map-marker';
            break;
        case 'Reciept':
            iconName = 'newspaper-o';
            break;
        default:
            break;
    }

    return <FontAwesome name={iconName} color={color} size={30} />;
};
const tabNavigator = ({route, navigation}) => {
    return (
        <Tab.Navigator
          
            screenOptions={({route}) => ({
                headerShown : false,
                tabBarIcon: ({color}) => iconOptions(route, color),
                tabBarActiveTintColor: "black" 
            })
          }   
            
            initialRouteName="Home"
            
            >
          <Tab.Screen name="Map" component={map} 
            options = {{  
              tabBarLabel: () => null
            }}/>
            <Tab.Screen name="Home" component={home}
              options = {{  
                tabBarLabel: () => null,
              }}
             />
            <Tab.Screen name="User" component={user} 
            options = {{  
              tabBarLabel: () => null
            }}/>
            <Tab.Screen name="Reciept" component={ReceiptTab} 
            options = {{  
              tabBarLabel: () => null
            }}/>
            
        </Tab.Navigator>
    );
};

export default tabNavigator;