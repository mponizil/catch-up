import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Text } from 'react-native'
import tw from 'tailwind-rn'
import { TextInputMask } from 'react-native-masked-text'

import useAuth from '../../hooks/useAuth'
import { AuthStackParamList } from '../../types'
import { View } from '../../components/Themed'
import Button from '../../components/Button'
import { textInputStyle } from '../../components/TextInput'

export default function SignInScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'SignIn'>) {
  const auth = useAuth()
  const [phone, setPhone] = useState('')
  const handleSignIn = async () => {
    if (!phone) {
      return
    }
    await auth.signIn(phone)
    navigation.navigate('VerifyPhone')
  }
  const handleHasCode = async () => {
    navigation.navigate('VerifyPhone')
  }
  return (
    <View style={tw('flex-auto p-4 pt-24')}>
      <View style={tw('mb-16')}>
        <Text style={tw('text-base')}>Sign in with your phone number</Text>
      </View>
      <View style={tw('w-full mb-4')}>
        <TextInputMask
          keyboardType="phone-pad"
          autoCompleteType="tel"
          value={phone}
          type="custom"
          options={{
            mask: '(999) 999-9999',
          }}
          onChangeText={setPhone}
          style={textInputStyle}
          autoFocus
        />
      </View>
      <View style={tw('w-full mb-4')}>
        <Button
          type="primary"
          text="Sign In"
          onPress={handleSignIn}
          disabled={auth.loading}
        />
      </View>
      <View>
        <Button
          type="link"
          text="I have a code"
          onPress={handleHasCode}
          disabled={auth.loading}
        />
      </View>
    </View>
  )
}
