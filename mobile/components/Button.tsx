import React, { ReactElement } from 'react'
import {
  Text,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import tw from 'tailwind-rn'
import cn from 'classnames'

const ButtonStylesForType = {
  plain: '',
  default: 'bg-gray-200',
  primary: 'bg-green-600',
  link: 'p-2',
}

const TextStylesForType = {
  plain: '',
  default: 'text-gray-900',
  primary: 'text-white',
  link: 'text-blue-500 font-medium',
}

export interface IButtonProps extends TouchableOpacityProps {
  type?: 'default' | 'primary' | 'link' | 'plain'
  text?: string
  style?: StyleProp<ViewStyle>
  children?: ReactElement | ReactElement[]
}

export default function Button({
  type,
  text,
  style,
  children,
  ...props
}: IButtonProps) {
  type = type || 'plain'
  const baseStyle =
    type !== 'plain'
      ? 'w-full px-8 py-3 rounded-lg border border-transparent'
      : ''
  const buttonStyle = ButtonStylesForType[type]
  const textStyle = TextStylesForType[type]
  return (
    <TouchableOpacity
      style={[
        tw(cn(baseStyle, buttonStyle)),
        style,
        props.disabled && tw('opacity-50'),
      ]}
      {...props}
    >
      {text ? (
        <Text style={tw(cn('text-base text-center font-semibold', textStyle))}>
          {text}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
