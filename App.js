import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect} from 'react'; 
import RenderHTML from 'react-native-render-html';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Home, Advice} from "./screens"
import { Entypo } from '@expo/vector-icons';


const Tab =createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
            name="home" 
            component={Home} 
            options={{
              tabBarIcon:({focused})=>{
                return (
                  <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} />
                    <Text style={{fonSize: 12, color: "#16247d"}}>HOME</Text>
              </View>
                )
              }
            }}
            />        
         <Tab.Screen 
          name="advice" 
          component={Advice} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="Home" size={24} color={focused ? "#16247d": "#111"} />
                  <Text style={{fonSize: 12, color: "#16247d"}}>ADVICE</Text>
            </View>
              )
            }
          }}
          />

      </Tab.Navigator>
    </NavigationContainer>
  )
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