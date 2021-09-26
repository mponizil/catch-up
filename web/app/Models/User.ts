import { DateTime } from 'luxon'
import { column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from './BaseModel'
import Wave from './Wave'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phone: string

  @column()
  public firstName: string | null

  @column()
  public lastName: string | null

  @column()
  public photoUrl: string | null

  @manyToMany(() => User, {
    pivotTable: 'contacts',
    pivotForeignKey: 'from_user_id',
    pivotRelatedForeignKey: 'to_user_id',
    pivotColumns: ['first_name', 'last_name', 'photo_url'],
    pivotTimestamps: true,
  })
  public contacts: ManyToMany<typeof User>

  @hasMany(() => Wave)
  public waves: HasMany<typeof Wave>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras() {
    const extras = super.serializeExtras() as any
    // Indicates that we're being serialized as a Contact
    if (extras.pivotFromUserId) {
      return {
        contact: {
          firstName: extras.pivotFirstName,
          lastName: extras.pivotLastName,
          photoUrl: extras.pivotPhotoUrl,
        },
      }
    }
    return {}
  }
}
