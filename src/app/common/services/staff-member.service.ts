import {Injectable} from '@nestjs/common';
import {CreateOrUpdateStaffMemberDto} from '../../api/dto/staff-members/create-or-update-staff-member.dto';
import {StaffMember} from "../entities/staff-member.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BaseService} from "./BaseService";

@Injectable()
export class StaffMemberService extends BaseService<StaffMember> {

    notFoundErrorMsg: `Staff Member not found`;

    public constructor(
        @InjectRepository(StaffMember)
            repository: Repository<StaffMember>
    ) {
        super(repository);
    }

    public async create(createStaffMemberDto: CreateOrUpdateStaffMemberDto) {
        const staffMember = new StaffMember(createStaffMemberDto);
        await this.repository.manager.save(staffMember);

        return staffMember;
    }

    public async existsWithName(first_name: string, last_name: string): Promise<boolean> {
        return await this.exists({where: {first_name: first_name, last_name: last_name}});
    }

    public async findOneById(id: number): Promise<StaffMember> {
        return this.findOne({where: {id: id}});
    }

    public async update(id: number, updateStaffMemberDto: CreateOrUpdateStaffMemberDto) {
        const staffMember = await this.findOneById(id);
        staffMember.update(updateStaffMemberDto);

        await this.repository.manager.save(staffMember);

        return staffMember;
    }
}
