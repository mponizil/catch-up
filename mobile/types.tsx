/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Auth: undefined
  App: undefined
  NotFound: undefined
}

export type AuthStackParamList = {
  SignIn: undefined
  VerifyPhone: undefined
}

export type AppStackParamList = {
  AppTabs: undefined
  SetStatusModal: undefined
}

export type AppTabsParamList = {
  Feed: undefined
  Settings: undefined
}

export type FeedStackParamList = {
  FeedScreen: undefined
}

export type SettingsStackParamList = {
  SettingsScreen: undefined
}
