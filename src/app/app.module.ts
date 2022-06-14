import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppDataSource} from "../db/data-source";
import {DataSource} from "typeorm";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ApiModule} from "./api/api.module";
import {Appointment} from "./common/entities/appointment.entity";
import {Client} from "./common/entities/client.entity";
import {StaffMember} from "./common/entities/staff-member.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({...AppDataSource.options, autoLoadEntities: true}),
        ApiModule,
        TypeOrmModule.forFeature([Appointment, Client, StaffMember]),
    ],
    providers: [
        {provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor},
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
