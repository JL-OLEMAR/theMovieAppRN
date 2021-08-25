import 'react-native-gesture-handler'
import React, { useMemo, useState } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper } from 'react-native-paper'
import { NavigationContainer, DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation } from '@react-navigation/native'

import { PreferencesContext } from './src/context/PreferencesContext'
import { Navigator } from './src/Navigation/Navigator'

LogBox.ignoreLogs(['`new NativeEventEmitter()`'])

const App = () => {
  const [theme, setTheme] = useState('dark')

  DefaultThemePaper.colors.primary = '#1ae1f2'
  DarkThemePaper.colors.primary = '#1ae1f2'
  DarkThemePaper.colors.accent = '#1ae1f2'

  DarkThemeNavigation.colors.background = '#192734'
  DarkThemeNavigation.colors.card = '#15212b'

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme
    }),
    [theme]
  )

  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation}>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  )
}

export default App
