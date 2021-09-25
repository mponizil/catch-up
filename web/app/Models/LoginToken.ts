import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

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
