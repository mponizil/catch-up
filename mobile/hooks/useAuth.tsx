// Adapted from https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10

import { isEmpty } from 'lodash'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import api from '../utils/api'

type ISession = any

export interface AuthContextType {
  session: ISession
  loading: boolean
  error?: any
  isLogout: boolean
  login: (phone: string) => void
  verifyPhone: (params: { phone: string; token: string }) => void
  logout: () => void
}

const parseSession = (session: ISession) => (isEmpty(session) ? null : session)

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [session, setSession] = useState<ISession>(null)
  const [error, setError] = useState<Response | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true)
  const [isLogout, setIsLogout] = useState(false)

  useEffect(() => {
    api
      .getSession()
      .then((newSession) => setSession(parseSession(newSession)))
      .catch((_error) => {})
      .finally(() => setLoadingInitial(false))
  }, [])

  function login(phone: string) {
    setLoading(true)
    api
      .login(phone)
      .catch((newError) => setError(newError))
      .finally(() => setLoading(false))
  }

  function verifyPhone(params: { phone: string; token: string }) {
    setLoading(true)
    api
      .verifyPhone(params)
      .then(() => api.getSession())
      .then((newSession) => setSession(parseSession(newSession)))
      .catch((newError) => setError(newError))
      .finally(() => setLoading(false))
  }

  function logout() {
    setIsLogout(true)
    api
      .logout()
      .then(() => setSession(null))
      .finally(() => setIsLogout(false))
  }

  const contextValue = useMemo(
    () => ({
      session,
      loading,
      isLogout,
      error,
      login,
      verifyPhone,
      logout,
    }),
    [session, loading, error]
  ) as AuthContextType

  return (
    <AuthContext.Provider value={contextValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
