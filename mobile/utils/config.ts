import Constants from 'expo-constants'

enum AppEnvironment {
  Local = 'local',
  LAN = 'lan',
}

const environment: AppEnvironment =
  Constants.manifest?.extra?.environment || AppEnvironment.Local

const configByEnv = {
  [AppEnvironment.Local]: {
    api: {
      host: 'http://127.0.0.1:3000',
    },
  },
  [AppEnvironment.LAN]: {
    api: {
      host: 'http://192.168.0.12:3000',
    },
  },
}

export default configByEnv[environment]
