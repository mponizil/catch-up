import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUserProfileColumns extends BaseSchema {
  public async up() {
    this.schema.alterTable('users', (table) => {
      table.string('first_name')
      table.string('last_name')
      table.string('photo_url')
    })
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('photo_url')
    })
  }
}
