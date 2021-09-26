import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contacts extends BaseSchema {
  protected tableName = 'contacts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('from_user_id').unsigned().notNullable()
      table.integer('to_user_id').unsigned().notNullable()
      table.string('first_name')
      table.string('last_name')
      table.string('photo_url')
      table.timestamps(true, true)
      table.foreign('from_user_id').references('users.id').onDelete('cascade')
      table.foreign('to_user_id').references('users.id').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
