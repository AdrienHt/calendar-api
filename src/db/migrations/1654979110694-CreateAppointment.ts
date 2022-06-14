import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique} from "typeorm"

export class CreateAppointments1654979110694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
                name: 'appointment',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'uuid',
                        type: 'string',
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'created_at',
                        type: 'int',
                    },
                    {
                        name: 'updated_at',
                        type: 'int',
                    },
                    {
                        name: 'client_id',
                        type: 'int',
                    },
                    {
                        name: 'staff_member_id',
                        type: 'int',
                    },
                    {
                        name: 'start_at',
                        type: 'int'
                    },
                    {
                        name: 'end_at',
                        type: 'int',
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    }
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys(
            'appointment',
            [
                new TableForeignKey({
                    columnNames: ["client_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "client",
                    onDelete: "CASCADE",
                }),
                new TableForeignKey({
                    columnNames: ["staff_member_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "staff_member",
                    onDelete: "CASCADE",
                }),
            ]
        );

        await queryRunner.createIndex(
            'appointment',
            new TableIndex({
                columnNames: ['client_id', 'staff_member_id'],
            }),
        );

        await queryRunner.createUniqueConstraint(
            'appointment',
            new TableUnique({
                columnNames: ['client_id', 'staff_member_id', 'start_at', 'end_at'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointment');
    }

}
