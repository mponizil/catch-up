import { Twilio as TwilioClient } from 'twilio'
import Env from '@ioc:Adonis/Core/Env'

export default new TwilioClient(Env.get('TWILIO_ACCOUNT_SID'), Env.get('TWILIO_AUTH_TOKEN'))
