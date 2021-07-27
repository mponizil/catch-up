import React from 'react'
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native'
import tw from 'tailwind-rn'

export interface ITextInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>
}

export const textInputStyle = tw(
  'w-full p-4 border border-gray-300 text-base leading-5 rounded-lg'
)

export default function TextInput({ style, ...props }: ITextInputProps) {
  return <RNTextInput style={[textInputStyle, style]} {...props} />
}
