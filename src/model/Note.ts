import { Model, Table, Column, DataType } from "sequelize-typescript"

@Table({
  tableName: Note.NOTE_TABLE_NAME // specifies the name of the table in the database
})
export class Note extends Model {
  // static properties used as constants for table column names
  public static NOTE_TABLE_NAME = "note" as string
  public static NOTE_ID = "id" as string
  public static NOTE_NAME = "name" as string
  public static NOTE_DESCRIPTION = "description" as string

  // defines the columns of the table using the `@Column` decorator
  @Column({
    type: DataType.INTEGER, // specifies the data type of the column
    primaryKey: true, // specifies whether the column is a primary key
    autoIncrement: true, // specifies whether the column auto-increments
    field: Note.NOTE_ID // specifies the name of the column in the database
  })
  id!: number

  @Column({
    type: DataType.STRING(100),
    field: Note.NOTE_NAME
  })
  name!: string

  @Column({
    type: DataType.STRING(255),
    field: Note.NOTE_DESCRIPTION
  })
  description!: string
}
