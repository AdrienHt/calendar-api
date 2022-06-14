import {IsNotEmpty} from "class-validator";
import {StaffNameMemberExists} from "../../../common/validator/staff-member.name-exists.validator";

export class CreateOrUpdateStaffMemberDto {
    @IsNotEmpty()
    first_name: string

    @IsNotEmpty()
    @StaffNameMemberExists()
    last_name: string
}
