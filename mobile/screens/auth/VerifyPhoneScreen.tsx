import React, { useState } from 'react'
import tw from 'tailwind-rn'

import useAuth from '../../hooks/useAuth'
import { Text, View } from '../../components/Themed'
import Button from '../../components/Button'
import OneTimeCodeInput from '../../components/OneTimeCodeInput'

export default function VerifyPhoneScreen() {
  const auth = useAuth()
  const [code, setCode] = useState('')
  const handleVerify = async () => {
    await auth.verifyPhone({
      phone: '760-846-3179',
      token: code,
    })
    setCode('')
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
        <Button onPress={handleVerify} text="Verify" disabled={auth.loading} />
      </View>
    </View>
  )
}
