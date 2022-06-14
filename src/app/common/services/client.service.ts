import {Injectable} from '@nestjs/common';
import {CreateOrUpdateClientDto} from '../../api/dto/client/create-or-update-client.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Client} from "../entities/client.entity";
import {BaseService} from "./BaseService";

@Injectable()
export class ClientService extends BaseService<Client> {
    notFoundErrorMsg: `Client not found`;

    constructor(
        @InjectRepository(Client)
            repository: Repository<Client>
    ) {
        super(repository);
    }

    public async create(createStaffMemberDto: CreateOrUpdateClientDto) {
        const client = new Client(createStaffMemberDto);
        await this.repository.manager.save(client);

        return client;
    }

    public async existsWithName(name: string): Promise<boolean> {
        return await this.exists({where: {name: name}});
    }

    public async update(uuid: string, updateStaffMemberDto: CreateOrUpdateClientDto) {
        const staffMember = await this.findOneByUuid(uuid);
        staffMember.update(updateStaffMemberDto);

        await this.repository.manager.save(staffMember);

        return staffMember;
    }

    public async findOneByUuid(uuid: string): Promise<Client> {
        return this.findOne({where: {uuid: uuid}});
    }
}
