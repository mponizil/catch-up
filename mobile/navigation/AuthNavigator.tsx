import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import LoginScreen from '../screens/auth/LoginScreen'
import VerifyPhoneScreen from '../screens/auth/VerifyPhoneScreen'
import { AuthStackParamList } from '../types'

const AuthStack = createStackNavigator<AuthStackParamList>()

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
    </AuthStack.Navigator>
  )
}
