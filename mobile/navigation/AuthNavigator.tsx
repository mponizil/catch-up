import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import SignInScreen from '../screens/auth/SignInScreen'
import { AuthParamList } from '../types'

const AuthStack = createStackNavigator<AuthParamList>()

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerTitle: 'Sign In' }}
      />
    </AuthStack.Navigator>
  )
}
