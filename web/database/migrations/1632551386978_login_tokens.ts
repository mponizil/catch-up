import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LoginTokens extends BaseSchema {
  protected tableName = 'login_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('identifier', 255).notNullable()
      table.string('token', 255).notNullable().unique()
      table.timestamp('expires_at').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
