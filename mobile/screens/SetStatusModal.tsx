import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { ScrollView, View, Text, Pressable } from 'react-native'
import tw from 'tailwind-rn'

import { AppStackParamList } from '../types'
import Button from '../components/Button'

export default function SetStatusModal({
  navigation,
}: StackScreenProps<AppStackParamList, 'SetStatusModal'>) {
  return (
    <ScrollView style={tw('flex-auto')}>
      <View style={tw('flex-row justify-center items-center')}>
        <View style={tw('p-3 flex-1')} />
        <View style={tw('p-3 flex-auto justify-center')}>
          <Text style={tw('text-base text-center font-semibold')}>
            My Status
          </Text>
        </View>
        <View style={tw('p-3 flex-1')}>
          <Button type="link" text="Done" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ScrollView>
  )
}
