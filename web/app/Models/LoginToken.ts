import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from './BaseModel'

export default class LoginToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public identifier: string

  @column()
  public token: string

  @column()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
