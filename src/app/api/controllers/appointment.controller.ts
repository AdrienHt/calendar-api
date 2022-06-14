import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AppointmentService} from '../../common/services/appointment.service';
import {CreateAppointmentDto} from '../dto/appointment/create-appointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    @Post()
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @Get()
    findAll() {
        return this.appointmentService.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string) {
        return this.appointmentService.findOneByUuid(uuid);
    }
}
