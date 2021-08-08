import * as React from 'react'
import { Image, ScrollView, Pressable } from 'react-native'
import useAsync from 'react-use/lib/useAsync'
import tw from 'tailwind-rn'
import { ChatIcon, PhoneIcon } from 'react-native-heroicons/solid'

import { Text, View } from '../components/Themed'
import { personName } from '../utils/utils'
import api, { Status, IContact } from '../utils/api'

export default function FeedScreen() {
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
    console.log('set my status')
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

  const free = feed!.filter((contact) => contact.status === Status.Free)
  const busy = feed!.filter((contact) => contact.status === Status.Busy)

  return (
    <>
      <View
        style={tw(
          'w-full pt-6 flex-row justify-center absolute bg-transparent z-10'
        )}
      >
        <Pressable
          onPress={handlePressStatus}
          style={{
            ...tw('py-2 px-4 flex-row items-center rounded bg-white'),
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
        </Pressable>
      </View>
      <ScrollView style={tw('bg-white flex-auto pt-20')}>
        {free.map((contact) => (
          <>
            <View
              style={tw('flex-row items-center px-4 py-2')}
              key={contact.id}
            >
              <View style={tw('flex-auto flex-row items-center')}>
                <Image
                  style={tw('w-14 h-14 rounded-full')}
                  source={{
                    uri: contact.photoUrl,
                  }}
                />
                <View style={tw('ml-4')}>
                  <Text style={tw('text-base font-medium')}>
                    {personName(contact)}
                  </Text>
                  <Text style={tw('text-sm text-gray-400 italic')}>
                    {contact.lastSeen.toFormat('h:mma').toLowerCase()}
                  </Text>
                </View>
              </View>
              <View style={tw('flex-row')}>
                <Pressable
                  onPress={() => handleMessage(contact)}
                  style={tw('bg-gray-200 rounded-full p-2')}
                >
                  <ChatIcon color="#A1A1AA" size={20} />
                </Pressable>
                <Pressable
                  onPress={() => handleCall(contact)}
                  style={tw('bg-gray-200 rounded-full p-2 ml-3')}
                >
                  <PhoneIcon color="#A1A1AA" size={20} />
                </Pressable>
              </View>
            </View>
            <View style={tw('m-1 bg-gray-100 h-px')} />
          </>
        ))}
        {busy.map((contact) => (
          <>
            <View
              style={tw('flex-row items-center px-4 py-2')}
              key={contact.id}
            >
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
              </View>
            </View>
            <View style={tw('m-1 bg-gray-100 h-px')} />
          </>
        ))}
      </ScrollView>
    </>
  )
}
