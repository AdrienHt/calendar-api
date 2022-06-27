import {Injectable} from '@nestjs/common';
import {CreateAppointmentDto} from '../../api/dto/appointment/create-appointment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BaseService} from "./BaseService";
import {Appointment} from "../entities/appointment.entity";

@Injectable()
export class AppointmentService extends BaseService<Appointment> {
    notFoundErrorMsg: `Appointment not found`;

    public constructor(
        @InjectRepository(Appointment)
            repository: Repository<Appointment>
    ) {
        super(repository);
    }

    protected getAppointmentOnRange(startAt: string, endAt: string) {
        return this.repository.createQueryBuilder('appointment')
            .where(
                '((start_at - :currentEndAt) * (end_at - :currentStartAt)) <= 0',
                {
                    'currentEndAt': endAt,
                    'currentStartAt': startAt
                }
            );
    }

    public async isClientAvailable(clientId: number, startAt: string, endAt: string): Promise<boolean> {
        return await this.getAppointmentOnRange(startAt, endAt)
            .andWhere('client_id = :clientId', {'clientId': clientId})
            .getCount() === 0;
    }

    public async isStaffMemberAvailable(staffMemberId: number, startAt: string, endAt: string): Promise<boolean> {
        return await this.getAppointmentOnRange(startAt, endAt)
            .andWhere('staff_member_id = :staffMemberId', {'staffMemberId': staffMemberId})
            .getCount() === 0;
    }

    public async create(createAppointmentDto: CreateAppointmentDto) {
        const appointment = new Appointment(createAppointmentDto);
        await this.repository.manager.save(appointment);

        return appointment;
    }

    public async findOneById(id: number): Promise<Appointment> {
        return this.findOne({where: {id: id}});
    }
}
