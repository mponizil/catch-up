import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Waves extends BaseSchema {
  protected tableName = 'waves'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable()
      table.timestamp('starts_at').notNullable()
      table.timestamp('ends_at').notNullable()
      table.timestamps(true, true)
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
