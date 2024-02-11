import React, { useState, useEffect } from 'react';

import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import Home  from '../screens';
import FullInfo from '../screens';

const Stack = createStackNavigator()

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name="Home"
            component={Home}
            options={{title: "Дом"}}/>
            <Stack.Screen 
            name="FullInfo"
            component={FullInfo}
            options={{title: "Полная инфа о статьях"}}/>
        </Stack.Navigator>
    </NavigationContainer>
}