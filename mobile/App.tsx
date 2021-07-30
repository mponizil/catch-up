import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import tw from 'tailwind-rn'

import { AuthProvider } from './hooks/useAuth'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <SafeAreaView style={tw('flex-auto')}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaView>
        </AuthProvider>
      </SafeAreaProvider>
    )
  }
}
