import {DataSource} from "typeorm";
import {StaffMember} from "../app/common/entities/staff-member.entity";
import {CreateStaffMembers1654959317716} from "./migrations/1654959317716-CreateStaffMember";
import {CreateClients1654978582415} from "./migrations/1654978582415-CreateClient";
import {CreateAppointments1654979110694} from "./migrations/1654979110694-CreateAppointment";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'sqlite/db.sqlite',
    synchronize: false,
    logging: true,
    subscribers: [],
    migrations: [CreateStaffMembers1654959317716, CreateClients1654978582415, CreateAppointments1654979110694],
});
