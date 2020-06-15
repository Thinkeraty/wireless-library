import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import BookTransaction from './screens/BookTransaction';
import SearchBook from './screens/SearchBook';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends React.Component {
  render() {
    return(
      <AppContainer />
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: BookTransaction},
  Search: {screen: SearchBook}
},
  {
    defaultNavigationOptions: ({navigation}) => {
      ({
        tabBarIcon: ({}) => {
          const routeName = navigation.state.routeName;

          if(routeName === 'Transaction') {
            return (
              <Image 
                source={require('./assets/book.png')}
                style={{width: 80, height: 80}}
              />
            )
          } else if(routeName === 'Search') {
            return(
              <Image 
                source={require('./assets/searchingbook.png')}
                style={{width: 80, height : 80}}
              />
            )
          }
        }
      })
    }
  }
)

const AppContainer = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
