import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../pages/Home'
import { Movie } from '../pages/Movie'
import { News } from '../pages/News'
import { Popular } from '../pages/Popular'
import { Search } from '../pages/Search'

const Stack = createStackNavigator()

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={Home}
        options={{ title: 'TheMovieApp' }}
      />
      <Stack.Screen
        name='movie'
        component={Movie}
        options={{ title: '' }}
      />
      <Stack.Screen
        name='news'
        component={News}
        options={{ title: 'Nuevas Películas' }}
      />
      <Stack.Screen
        name='popular'
        component={Popular}
        options={{ title: 'Películas Populares' }}
      />
      <Stack.Screen
        name='search'
        component={Search}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  )
}
