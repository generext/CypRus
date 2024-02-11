import React from "react";

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, useWindowDimensions  } from 'react-native';
import * as SQLite from 'expo-sqlite';
import RenderHTML from 'react-native-render-html';

export default function FullInfo() {
    return (
      <View style={styles.container}>
        <TextInput
          value={currentName}
          onChangeText={text => setCurrentName(text)}
          placeholder='Enter HTML content'
          style={styles.input}
        />
        <Button title='Add HTML Content' />
        
        <StatusBar style="auto" />
      </View>
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