import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { StyleProp, ViewStyle, ScrollView, View, Text } from 'react-native'
import tw from 'tailwind-rn'

import { AppStackParamList } from '../types'
import Button, { IButtonProps } from '../components/Button'

interface IButtonToggleProps extends IButtonProps {
  selected: boolean
  style?: StyleProp<ViewStyle>
}

const ButtonToggle = ({ selected, style, ...props }: IButtonToggleProps) => {
  const toggleStyle = selected ? tw('bg-gray-100') : {}
  return (
    <Button
      style={[tw('py-3 px-5 rounded-lg'), toggleStyle, style]}
      {...props}
    />
  )
}

enum Status {
  Unavailable = 'unavailable',
  FifteenMinutes = 'fifteen-minutes',
  ThirtyMinutes = 'thirty-minutes',
  OneHour = 'one-hour',
  Indefinite = 'indefinite',
}

const availableStatuses = [
  Status.FifteenMinutes,
  Status.ThirtyMinutes,
  Status.OneHour,
  Status.Indefinite,
]

const TextForStatus = {
  [Status.Unavailable]: 'Unavailable',
  [Status.FifteenMinutes]: '15 minutes',
  [Status.ThirtyMinutes]: '30 minutes',
  [Status.OneHour]: '1 hour',
  [Status.Indefinite]: 'Indefinite',
}

const SubtextForStatus = {
  [Status.FifteenMinutes]: '7:45pm - 8pm',
  [Status.ThirtyMinutes]: '7:45pm - 8:15pm',
  [Status.OneHour]: '7:45pm - 8:45pm',
}

interface IStatusToggleProps {
  option: Status
  text: string
  subtext?: string
  selected: boolean
  onPress: (option: Status) => any
}

const StatusToggle = ({
  option,
  text,
  subtext,
  selected,
  onPress,
}: IStatusToggleProps) => (
  <ButtonToggle
    selected={selected}
    onPress={() => onPress(option)}
    style={tw('my-2 flex-row justify-between items-center')}
  >
    <Text style={tw('text-base font-semibold')}>{text}</Text>
    {subtext ? (
      <Text style={tw('text-base text-gray-600 italic')}>{subtext}</Text>
    ) : (
      <></>
    )}
  </ButtonToggle>
)

export default function SetStatusModal({
  navigation,
}: StackScreenProps<AppStackParamList, 'SetStatusModal'>) {
  const [status, setStatus] = useState<Status>()
  return (
    <View style={tw('flex-auto bg-white')}>
      <View style={tw('flex-row justify-center items-center')}>
        <View style={tw('py-3 flex-1')}>
          <Button
            type="link"
            text="Cancel"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={tw('p-3 flex-auto justify-center')}>
          <Text style={tw('text-base text-center font-semibold')}>
            My Status
          </Text>
        </View>
        <View style={tw('py-3 flex-1')}>
          <Button type="link" text="Save" onPress={() => navigation.goBack()} />
        </View>
      </View>
      <ScrollView style={tw('flex-auto')}>
        <View style={tw('px-4')}>
          <ButtonToggle
            selected={status === Status.Unavailable}
            onPress={() => setStatus(Status.Unavailable)}
            style={tw('my-2')}
          >
            <Text style={tw('text-base')}>Unavailable</Text>
          </ButtonToggle>
          <View style={tw('my-2 bg-gray-100 h-px')} />
          {availableStatuses.map((option) => (
            <StatusToggle
              key={option}
              option={option}
              selected={status === option}
              text={TextForStatus[option]}
              subtext={SubtextForStatus[option]}
              onPress={() => setStatus(option)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
