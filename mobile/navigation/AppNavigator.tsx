/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { View, Text } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import FeedScreen from '../screens/FeedScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SetStatusModal from '../screens/SetStatusModal'
import {
  AppStackParamList,
  AppTabsParamList,
  FeedStackParamList,
  SettingsStackParamList,
} from '../types'

const AppStack = createStackNavigator<AppStackParamList>()

export default function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Group>
        <AppStack.Screen name="AppTabs" component={AppTabsNavigator} />
      </AppStack.Group>
      <AppStack.Group screenOptions={{ presentation: 'modal' }}>
        <AppStack.Screen name="SetStatusModal" component={SetStatusModal} />
      </AppStack.Group>
    </AppStack.Navigator>
  )
}

const AppTabs = createBottomTabNavigator<AppTabsParamList>()

function AppTabsNavigator() {
  const colorScheme = useColorScheme()

  return (
    <AppTabs.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
      }}
    >
      <AppTabs.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <AppTabs.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
        }}
      />
    </AppTabs.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const FeedStack = createStackNavigator<FeedStackParamList>()

function FeedNavigator() {
  return (
    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
    </FeedStack.Navigator>
  )
}

const SettingsStack = createStackNavigator<SettingsStackParamList>()

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsStack.Navigator>
  )
}
