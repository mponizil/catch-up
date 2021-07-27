import React, { useState } from 'react'
import { CompositeNavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Pressable } from 'react-native'
import tw from 'tailwind-rn'

import { AuthStackParamList, RootStackParamList } from '../../types'
import { Text, View } from '../../components/Themed'
import Button from '../../components/Button'
import OneTimeCodeInput from '../../components/OneTimeCodeInput'
import api from '../../utils/api'

export default function VerifyPhoneScreen({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, 'VerifyPhone'>,
    StackNavigationProp<RootStackParamList>
  >
}) {
  const [code, setCode] = useState('')
  const handleVerify = async () => {
    await api.verifyPhone({
      phone: '760-846-3179',
      token: code,
    })
    setCode('')
    navigation.navigate('Root')
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
    <View style={tw('flex-auto p-4 pt-24')}>
      <View style={tw('mb-16')}>
        <Text style={tw('text-base')}>We sent you a verification code</Text>
      </View>
      <View style={tw('mb-16')}>
        <OneTimeCodeInput value={code} onChange={setCode} autoFocus />
      </View>
      <View style={tw('w-full mb-4')}>
        <Button onPress={handleVerify} text="Verify" />
      </View>
      <View style={tw('w-full mb-4')}>
        <Button onPress={handleHello} text="Hello world" />
      </View>
      <View style={tw('w-full')}>
        <Pressable onPress={handleSignOut} text="Sign out" />
      </View>
    </View>
  )
}
