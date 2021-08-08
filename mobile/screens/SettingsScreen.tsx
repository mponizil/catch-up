import * as React from 'react'
import { StyleSheet } from 'react-native'
import tw from 'tailwind-rn'

import { Text, View } from '../components/Themed'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'

export default function SettingsScreen() {
  const auth = useAuth()
  return (
    <View style={tw('flex-auto p-4')}>
      <Text style={styles.title}>Settings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button type="default" onPress={() => auth.signOut()} text="Sign Out" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
