import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect} from 'react'; 
import RenderHTML from 'react-native-render-html';

export default function Home() {
  const db = SQLite.openDatabase('articles2.db');
  const [isLoading, setIsLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');
  const [currentName, setCurrentName] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS articles2 (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)'
      );
      tx.executeSql(
        'SELECT * FROM articles2 ORDER BY id DESC LIMIT 1',
        [],
        (_, resultSet) => {
          const { rows } = resultSet;
          if (rows.length > 0) {
            const articleContent = rows.item(0).content;
            setHtmlContent(articleContent);
          }
          setIsLoading(false);
        },
        (_, error) => console.log('ошибка:', error)
      );
    });
  }, []);

  const addName = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO articles2 (content) values (?)',
        [currentName],
        (_, resultSet) => {
          setCurrentName('');
          console.log('добавилось:', currentName); 
          tx.executeSql(
            'SELECT * FROM articles2 ORDER BY id DESC LIMIT 1',
            [],
            (_, resultSet) => {
              const { rows } = resultSet;
              if (rows.length > 0) {
                const articleContent = rows.item(0).content;
                setHtmlContent(articleContent);
              }
            },
            (_, error) => console.log('ошибка:', error)
          );
        },
        (txObj, error) => console.log('ошибка при добавлении:', error) 
      );
    });
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          value={currentName}
          onChangeText={setCurrentName}
          placeholder='Enter HTML content'
          style={styles.input}
        />
        <Button title='Add HTML Content' onPress={addName} />
        <RenderHTML source={{ html: htmlContent }} />
        <StatusBar style="auto" />
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