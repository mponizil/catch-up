import * as React from 'react'
import { Image, ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import useAsync from 'react-use/lib/useAsync'
import tw, { getColor } from 'tailwind-rn'
import { ChatIcon, PhoneIcon } from 'react-native-heroicons/solid'
import { orderBy } from 'lodash'

import { AppStackParamList } from '../types'
import { Text, View } from '../components/Themed'
import Button from '../components/Button'
import { personName } from '../utils/utils'
import api, { Status, IContact } from '../utils/api'

export default function FeedScreen({
  navigation,
}: StackScreenProps<AppStackParamList, 'AppTabs'>) {
  const {
    loading: loadingMe,
    value: me,
    error: errorMe,
  } = useAsync(() => api.me())
  const {
    loading: loadingFeed,
    value: feed,
    error: errorFeed,
  } = useAsync(() => api.feed())

  const handlePressStatus = () => {
    navigation.navigate('SetStatusModal')
  }

  const handleMessage = (contact: IContact) => {
    console.log('go to sms', contact)
  }

  const handleCall = (contact: IContact) => {
    console.log('call', contact)
  }

  if (loadingMe || loadingFeed) {
    return (
      <View style={tw('flex-auto')}>
        <Text>Loading ...</Text>
      </View>
    )
  }

  if (errorMe || errorFeed) {
    return (
      <View style={tw('flex-auto')}>
        <Text>Error :(</Text>
      </View>
    )
  }

  const free = orderBy(
    feed!.filter((contact) => contact.status === Status.Free),
    ['lastFree.end'],
    ['desc']
  )
  const busy = orderBy(
    feed!.filter((contact) => contact.status === Status.Busy),
    ['lastFree.end'],
    ['desc']
  )

  return (
    <View style={tw('flex-auto')}>
      <View
        style={tw(
          'w-full pt-6 flex-row justify-center absolute bg-transparent z-10'
        )}
      >
        <Button
          onPress={handlePressStatus}
          style={{
            ...tw('py-2 px-4 flex-row items-center rounded-full bg-white'),
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 6,
          }}
        >
          <View style={tw('w-2.5 h-2.5 rounded-full bg-green-400')} />
          <View style={tw('ml-2 flex-row items-start')}>
            <Text style={tw('text-base font-medium')}>I am</Text>
            <Text style={tw('ml-1 text-base font-bold')}>{me!.status}</Text>
            <Text style={tw('ml-1 text-base text-gray-400 italic')}>
              until 8:45pm
            </Text>
          </View>
        </Button>
      </View>
      <ScrollView style={tw('bg-white flex-auto')}>
        <View style={tw('w-full pt-20')} />
        {free.map((contact, i) => (
          <View key={contact.id}>
            <View style={tw('flex-row items-center px-4 py-2')}>
              <View style={tw('flex-auto flex-row items-center')}>
                <View>
                  <Image
                    style={tw('w-14 h-14 rounded-full')}
                    source={{
                      uri: contact.photoUrl,
                    }}
                  />
                  <View
                    style={tw(
                      'w-3.5 h-3.5 rounded-full bg-green-400 border border-2 border-white absolute right-0 bottom-0'
                    )}
                  />
                </View>
                <View style={tw('ml-4')}>
                  <Text style={tw('text-base font-medium')}>
                    {personName(contact)}
                  </Text>
                  <Text style={tw('text-sm text-gray-400 italic')}>
                    Until {contact.lastFree.end.toFormat('h:mma').toLowerCase()}
                  </Text>
                </View>
              </View>
              <View style={tw('flex-row')}>
                <Button
                  onPress={() => handleMessage(contact)}
                  style={tw('bg-gray-200 rounded-full p-2')}
                >
                  <ChatIcon color={getColor('gray-400')} size={20} />
                </Button>
                <Button
                  onPress={() => handleCall(contact)}
                  style={tw('bg-gray-200 rounded-full p-2 ml-3')}
                >
                  <PhoneIcon color={getColor('gray-400')} size={20} />
                </Button>
              </View>
            </View>
            {i < free.length - 1 ? (
              <View style={tw('my-1 mx-4 bg-gray-100 h-px')} />
            ) : null}
          </View>
        ))}
        {busy.length > 0 ? (
          <View style={tw('my-1 mx-4 bg-gray-100 h-px')} />
        ) : null}
        {busy.map((contact, i) => (
          <View key={contact.id}>
            <View style={tw('flex-row items-center px-4 py-2')}>
              <Image
                style={tw('w-14 h-14 rounded-full')}
                source={{
                  uri: contact.photoUrl,
                }}
              />
              <View style={tw('ml-4')}>
                <Text style={tw('text-base font-semibold')}>
                  {personName(contact)}
                </Text>
                <Text style={tw('text-sm text-gray-400 italic')}>
                  {contact.lastFree.end.toFormat('MMM d')}
                  {', '}
                  {contact.lastFree.end.toFormat('h:mma').toLowerCase()}
                </Text>
              </View>
            </View>
            {i < busy.length - 1 ? (
              <View style={tw('my-1 mx-2 bg-gray-100 h-px')} />
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
