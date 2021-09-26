import { BaseModel as AdonisModel } from '@ioc:Adonis/Lucid/Orm'
import camelcaseKeys from 'camelcase-keys'

export default class BaseModel extends AdonisModel {
  public serialize() {
    const serialized = super.serialize(...arguments)
    return camelcaseKeys(serialized, {
      deep: true,
    })
  }
  public serializeExtras() {
    return camelcaseKeys(this.$extras, {
      deep: true,
    })
  }
}
