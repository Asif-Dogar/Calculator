import { SafeAreaView, StyleSheet, Switch, View, Text } from 'react-native';
import MyKeyboard from './srcfile/components/Keyboard';
import { myColors } from './srcfile/styles/Colors';
import { ThemeContext } from './srcfile/context/ThemeContext';
import { useState, useContext } from 'react';

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: 'black' }]}>
        <Switch
          style={{ marginTop: 20 }}
          value={theme === 'dark'}
          onValueChange={() => setTheme(theme == 'light' ? 'dark' : 'light')}
        />
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    //marginTop: 10,
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
