import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react'; 
import RenderHTML from 'react-native-render-html';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Advice, FullInfo } from "./screens";
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Это исправление

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff" // Используйте backgroundColor вместо background
  }
};

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="FullInfo" component={FullInfo}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
          name="home" 
          component={HomeStackScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
                <Text style={{fontSize: 12, color: "#16247d"}}>HOME</Text>
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="advice" 
          component={Advice} 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
                <Text style={{fontSize: 12, color: "#16247d"}}>ADVICE</Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
