import React from 'react'
import {
  Pressable,
  Text,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import tw from 'tailwind-rn'
import cn from 'classnames'

const PressableStylesForType = {
  default: 'bg-gray-200',
  primary: 'bg-green-600',
  link: 'p-2',
}

const TextStylesForType = {
  default: 'text-gray-900',
  primary: 'text-white',
  link: 'text-gray-500 font-normal',
}

export interface IButtonProps extends PressableProps {
  type?: 'default' | 'primary' | 'link'
  text: string
  style?: StyleProp<ViewStyle>
}

export default function Button({ type, text, style, ...props }: IButtonProps) {
  type = type || 'default'
  const pressableStyle = PressableStylesForType[type]
  const textStyle = TextStylesForType[type]
  return (
    <Pressable
      style={[
        tw(
          cn(
            'w-full px-8 py-3 rounded-lg border border-transparent',
            pressableStyle
          )
        ),
        style,
      ]}
      {...props}
    >
      <Text style={tw(cn('text-base text-center font-semibold', textStyle))}>
        {text}
      </Text>
    </Pressable>
  )
}
