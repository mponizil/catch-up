import Constants from 'expo-constants'

enum AppEnvironment {
  Local = 'local',
}

const environment: AppEnvironment =
  Constants.manifest?.extra?.environment || AppEnvironment.Local

const configByEnv = {
  [AppEnvironment.Local]: {
    api: {
      host: 'http://localhost:3000',
    },
  },
}

export default configByEnv[environment]
