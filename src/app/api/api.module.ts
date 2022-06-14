import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Appointment} from "../common/entities/appointment.entity";
import {Client} from "../common/entities/client.entity";
import {AppointmentController} from "./controllers/appointment.controller";
import {ClientController} from "./controllers/client.controller";
import {ClientService} from "../common/services/client.service";
import {AppointmentService} from "../common/services/appointment.service";
import {StaffMemberController} from "./controllers/staff-member.controller";
import {StaffMemberService} from "../common/services/staff-member.service";
import {StaffMember} from "../common/entities/staff-member.entity";
import {ClientExistsConstraint} from "../common/validator/client.exists.validator";
import {StaffMemberExistsConstraint} from "../common/validator/staff-member.exists.validator";
import {StaffMemberNameExistsConstraint} from "../common/validator/staff-member.name-exists.validator";
import {TimestampConstraint} from "../common/validator/is-timestamp.validator";
import {IsTimeStampAfterConstraint} from "../common/validator/is-timestamp-after.validator";
import {IsAvailableConstraint} from "../common/validator/is-available.validator";

@Module({
    imports: [TypeOrmModule.forFeature([Appointment, Client, StaffMember])],
    controllers: [AppointmentController, ClientController, StaffMemberController],
    providers: [
        ClientService,
        AppointmentService,
        StaffMemberService,
        ClientExistsConstraint,
        StaffMemberNameExistsConstraint,
        StaffMemberExistsConstraint,
        TimestampConstraint,
        IsTimeStampAfterConstraint,
        IsAvailableConstraint
    ]
})
export class ApiModule {
}
