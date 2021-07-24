/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking'

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          SignIn: 'sign-in',
          VerifyPhone: 'verify-phone',
        },
      },
      Root: {
        screens: {
          Feed: {
            screens: {
              FeedScreen: 'feed',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
}
