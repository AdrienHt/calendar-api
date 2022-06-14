import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ClientService} from '../../common/services/client.service';
import {CreateOrUpdateClientDto} from '../dto/client/create-or-update-client.dto';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {
    }

    @Post()
    create(@Body() createClientDto: CreateOrUpdateClientDto) {
        return this.clientService.create(createClientDto);
    }

    @Get()
    findAll() {
        return this.clientService.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string) {
        return this.clientService.findOneByUuid(uuid);
    }

    @Patch(':uuid')
    update(@Param('uuid') uuid: string, @Body() updateClientDto: CreateOrUpdateClientDto) {
        return this.clientService.update(uuid, updateClientDto);
    }
}
