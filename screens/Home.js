import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, useWindowDimensions, FlatList, Touchable, TouchableOpacity  } from 'react-native';
import * as SQLite from 'expo-sqlite';
import RenderHTML from 'react-native-render-html';

export default function Home({navigation}) {
  const db = SQLite.openDatabase('newArticles2.db');
  const [isLoading, setIsLoading] = useState(true);
  const [htmlContents, setHtmlContents] = useState([]);
  const [htmlHeaders, setHtmlHeaders] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const { width } = useWindowDimensions();


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS newArticles2 (id INTEGER PRIMARY KEY AUTOINCREMENT, idArticles INTEGER, idCategory INTEGER, idCyprus INTEGER, headerRus TEXT, headerENG TEXT, content TEXT);',
        [],
        () => {
          console.log('Таблица успешно создана');
          addInitialArticles();
        },
        (txObj, error) => console.log('Ошибка при создании таблицы:', error)
      );
    });
    fetchAllArticles();
  }, []);

  const addInitialArticles = () => {
    const articles = [
      { idArticles: 1, idCategory: 1, idCyprus: 1, headerRus: 'Example Header Rus', headerENG: 'Example Header ENG', content: '<p>id1</p>' },
      { idArticles: 2, idCategory: 2, idCyprus: 1, headerRus: 'Second Example Header', headerENG: 'Second Example Header ENG', content: '<p>id2 dskclms</p>' },
      { idArticles: 1, idCategory: 1, idCyprus: 1, headerRus: 'Example Header Rus', headerENG: 'Example Header ENG', content: '<p>id 1 еще один</p>' },
      { idArticles: 2, idCategory: 2, idCyprus: 1, headerRus: 'Second Example Header', headerENG: 'Second Example Header ENG', content: '<p>id 2 еще одно</p>' },
    
    ];

    articles.forEach(article => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO newArticles2 (idArticles, idCategory, idCyprus, headerRus, headerENG, content) VALUES (?, ?, ?, ?, ?, ?)',
          [article.idArticles, article.idCategory, article.idCyprus, article.headerRus, article.headerENG, article.content],
          () => console.log('Статья успешно добавлена'),
          (txObj, error) => console.log('Ошибка при добавлении статьи:', error)
        );
      });
    });
  };

  const fetchAllArticles = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT content FROM newArticles2 WHERE idCategory = 1 ORDER BY id DESC',
        [],
        (_, { rows }) => {
          let contents = [];
          let headers = []
          for (let i = 0; i < rows._array.length; i++) {
            contents.push(rows._array[i].content);
            headers.push(rows._array[i].headerRus)
            
          }
          setHtmlContents(contents);
          setHtmlHeaders(headers);
          setIsLoading(false);
        },
        (_, error) => console.log('Ошибка при выборке:', error)
      );
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          value={currentName}
          onChangeText={text => setCurrentName(text)}
          placeholder='Enter HTML content'
          style={styles.input}
        />
        <FlatList data={htmlHeaders} renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullInfo')}>
            
              {htmlContents.map((content, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
              <RenderHTML source={{ html: content }}  contentWidth={width} />
              </View>
            ))}
          </TouchableOpacity>
        )}
        />
          
        
      </View>
    );
  }
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