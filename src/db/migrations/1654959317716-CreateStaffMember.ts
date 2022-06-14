import {MigrationInterface, QueryRunner, Table, TableUnique} from 'typeorm'

export class CreateStaffMembers1654959317716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'staff_member',
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
                        type: 'string'
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
                        name: 'first_name',
                        type: 'varchar',
                        length: '128'
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '128'
                    }
                ],
            }),
            true,
        );

        await queryRunner.createUniqueConstraint(
            'staff_member',
            new TableUnique({
                columnNames: ['first_name', 'last_name'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('staff_member');
    }
}
