import React, { useState } from 'react'
import { Pressable } from 'react-native'
import tw from 'tailwind-rn'

import { Text, View } from '../../components/Themed'
import OneTimeCodeInput from '../../components/OneTimeCodeInput'
import api from '../../utils/api'

export default function SignInScreen() {
  const [code, setCode] = useState('')
  const handleSignIn = async () => {
    await api.signIn('760-846-3179')
  }
  const handleVerify = async () => {
    await api.verifyPhone({
      phone: '760-846-3179',
      token: code,
    })
    setCode('')
    await handleHello()
  }
  const handleHello = async () => {
    const session = await api.hello()
    if (session.user) {
      console.info(`hello ${session.user.email}`)
    }
  }
  const handleSignOut = async () => {
    await api.signOut()
  }
  return (
    <View style={tw('flex-auto justify-center items-center')}>
      <View style={tw('mb-4')}>
        <Pressable
          onPress={handleSignIn}
          style={tw('px-8 py-2 rounded bg-blue-400')}
        >
          <Text style={tw('text-white')}>Sign In</Text>
        </Pressable>
      </View>
      <View style={tw('mb-4')}>
        <OneTimeCodeInput value={code} onChange={setCode} />
      </View>
      <View style={tw('mb-4')}>
        <Pressable
          onPress={handleVerify}
          style={tw('px-8 py-2 rounded bg-blue-400')}
        >
          <Text style={tw('text-white')}>Verify</Text>
        </Pressable>
      </View>
      <View style={tw('mb-4')}>
        <Pressable
          onPress={handleHello}
          style={tw('px-8 py-2 rounded bg-blue-400')}
        >
          <Text style={tw('text-white')}>Hello world</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={handleSignOut}
          style={tw('px-8 py-2 rounded bg-blue-400')}
        >
          <Text style={tw('text-white')}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  )
}
