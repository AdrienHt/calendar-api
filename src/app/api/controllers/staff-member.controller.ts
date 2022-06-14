import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {StaffMemberService} from '../../common/services/staff-member.service';
import {CreateOrUpdateStaffMemberDto} from '../dto/staff-members/create-or-update-staff-member.dto';

@Controller('staff-members')
export class StaffMemberController {
    constructor(private readonly staffMembersService: StaffMemberService) {
    }

    @Post()
    create(@Body() createStaffMemberDto: CreateOrUpdateStaffMemberDto) {
        return this.staffMembersService.create(createStaffMemberDto);
    }

    @Get()
    findAll() {
        return this.staffMembersService.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string) {
        return this.staffMembersService.findOneByUuid(uuid);
    }

    @Put(':uuid')
    update(@Param('uuid') uuid: string, @Body() updateStaffMemberDto: CreateOrUpdateStaffMemberDto) {
        return this.staffMembersService.update(uuid, updateStaffMemberDto);
    }
}
