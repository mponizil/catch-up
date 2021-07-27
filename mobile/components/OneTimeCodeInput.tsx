import React, { useState, useRef } from 'react'
import { Pressable, Text, View, TextInput } from 'react-native'
import tw from 'tailwind-rn'
import cn from 'classnames'

const CODE_LENGTH = 4

export default function OneTimeCodeInput({ value, onChange, autoFocus }: any) {
  const [containerIsFocused, setContainerIsFocused] = useState(false)

  const codeDigitsArray = new Array(CODE_LENGTH).fill('')

  const ref = useRef<TextInput>(null)

  const handleOnPress = () => {
    setContainerIsFocused(true)
    ref?.current?.focus()
  }

  const handleOnFocus = () => {
    setContainerIsFocused(true)
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
      containerIsFocused && isFocused ? 'border-blue-300' : 'border-gray-300'

    return (
      <View
        key={idx}
        style={tw(
          cn(
            'w-14 h-14 border rounded-full p-3 justify-center items-center',
            containerStyle
          )
        )}
      >
        <Text style={tw('text-lg text-black text-center font-semibold')}>
          {digit}
        </Text>
      </View>
    )
  }
  return (
    <View style={tw('w-full h-14')}>
      <Pressable style={tw('flex-row justify-around')} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        autoFocus={autoFocus}
        ref={ref}
        value={value}
        onChangeText={onChange}
        onFocus={handleOnFocus}
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
