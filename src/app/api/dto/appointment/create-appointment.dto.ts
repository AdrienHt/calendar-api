import {isDate, IsNotEmpty, MinDate} from "class-validator";
import {ClientExists} from "../../../common/validator/client.exists.validator";
import {StaffMemberExists} from "../../../common/validator/staff-member.exists.validator";
import {IsTimeStamp} from "../../../common/validator/is-timestamp.validator";
import {IsTimeStampAfter} from "../../../common/validator/is-timestamp-after.validator";
import {IsAvailable} from "../../../common/validator/is-available.validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @ClientExists(true, 'id')
    @IsAvailable()
    client_id: number;

    @IsNotEmpty()
    @StaffMemberExists(true)
    @IsAvailable()
    staff_member_id: number;

    @IsNotEmpty()
    @IsTimeStamp(true)
    start_at: number;

    @IsTimeStamp(true)
    @IsNotEmpty()
    @IsTimeStampAfter(true, 'start_at')
    end_at: number;

    @IsNotEmpty()
    name: string;
}
