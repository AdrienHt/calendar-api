import {MigrationInterface, QueryRunner, Table, TableUnique} from "typeorm"

export class CreateClients1654978582415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'client',
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
                        type: 'int'
                    },
                    {
                        name: 'updated_at',
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

        await queryRunner.createUniqueConstraint(
            'client',
            new TableUnique({
                columnNames: ['name'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('client');
    }
}
