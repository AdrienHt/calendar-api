import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {DataSource, Repository} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";
import {StaffMember} from "../entities/staff-member.entity";
import {BaseEntity} from "../entities/base.entity";

@Injectable()
export abstract class BaseService<Entity extends BaseEntity> {

    protected notFoundErrorMsg: string

    protected constructor(protected repository: Repository<Entity>) {
    }

    public async exists(findManyOptions: FindOneOptions<Entity>): Promise<boolean> {
        return await this.repository.count(findManyOptions) !== 0;
    }

    public async findOne(options: FindOneOptions<Entity>): Promise<Entity> {
        const entity = await this.repository.findOne(options);

        if (!entity) {
            throw new NotFoundException(StaffMember, this.notFoundErrorMsg);
        }

        return entity
    }

    public findAll(): Promise<Entity[]> {
        return this.repository.find();
    }
}