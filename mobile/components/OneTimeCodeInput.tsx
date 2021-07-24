import React, { useState, useRef } from 'react'
import { Pressable, Text, View, TextInput } from 'react-native'
import tw from 'tailwind-rn'

const CODE_LENGTH = 4

export default function OneTimeCodeInput({ value, onChange }: any) {
  const [containerIsFocused, setContainerIsFocused] = useState(false)

  const codeDigitsArray = new Array(CODE_LENGTH).fill('')

  const ref = useRef<TextInput>(null)

  const handleOnPress = () => {
    setContainerIsFocused(true)
    ref?.current?.focus()
  }

  const handleOnBlur = () => {
    setContainerIsFocused(false)
  }

  const toDigitInput = (_character: number, idx: number) => {
    const emptyInputChar = ' '
    const digit = value[idx] || emptyInputChar

    const isCurrentDigit = idx === value.length
    const isLastDigit = idx === CODE_LENGTH - 1
    const isCodeFull = value.length === CODE_LENGTH

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull)

    const containerStyle =
      containerIsFocused && isFocused
        ? tw('flex-1 border rounded p-3 border-blue-300')
        : tw('flex-1 border rounded p-3 border-gray-300')

    return (
      <View key={idx} style={containerStyle}>
        <Text style={tw('text-lg text-black text-center')}>{digit}</Text>
      </View>
    )
  }
  return (
    <View style={tw('w-48 h-12')}>
      <Pressable
        style={tw('flex-1 flex-row justify-between')}
        onPress={handleOnPress}
      >
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={tw('absolute h-0 w-0 opacity-0')}
      />
    </View>
  )
}
