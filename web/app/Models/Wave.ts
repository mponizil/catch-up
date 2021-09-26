import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from './BaseModel'
import User from './User'

export default class Wave extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public startsAt: DateTime

  @column()
  public endsAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
