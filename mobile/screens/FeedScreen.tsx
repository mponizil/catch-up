import * as React from 'react'
import { Image, ScrollView } from 'react-native'
import useAsync from 'react-use/lib/useAsync'
import tw from 'tailwind-rn'

import { Text, View } from '../components/Themed'
import api, { Status, IContact } from '../utils/api'

const FeedSection = ({
  title,
  contacts,
}: {
  title: string
  contacts: IContact[]
}) => {
  return (
    <View style={tw('p-4')}>
      <Text style={tw('text-lg font-bold')}>{title}</Text>
      {contacts.map((contact) => (
        <View style={tw('flex-row mb-4')} key={contact.id}>
          <Image
            style={tw('w-32 h-32 rounded-full')}
            source={{
              uri: contact.photoUrl,
            }}
          />
        </View>
      ))}
    </View>
  )
}

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
    <ScrollView style={tw('flex-auto')}>
      <View style={tw('p-4')}>
        <Text>
          Hi, {me!.firstName} {me!.lastName}
        </Text>
        <Text>You are {me!.status}</Text>
      </View>
      <FeedSection title="Who's free?" contacts={free} />
      <FeedSection title="Everyone else" contacts={busy} />
    </ScrollView>
  )
}
