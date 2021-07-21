import * as React from 'react'
import { StyleSheet, Image, ScrollView } from 'react-native'
import useAsync from 'react-use/lib/useAsync'

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
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {contacts.map((contact) => (
        <View style={styles.row} key={contact.id}>
          <Image
            style={styles.avatar}
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
      <View style={styles.container}>
        <Text>Loading ...</Text>
      </View>
    )
  }

  if (errorMe || errorFeed) {
    return (
      <View style={styles.container}>
        <Text>Error :(</Text>
      </View>
    )
  }

  const free = feed!.filter((contact) => contact.status === Status.Free)
  const busy = feed!.filter((contact) => contact.status === Status.Busy)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})
