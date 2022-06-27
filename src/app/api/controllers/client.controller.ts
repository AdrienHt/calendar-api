import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ClientService} from '../../common/services/client.service';
import {CreateOrUpdateClientDto} from '../dto/client/create-or-update-client.dto';

@Controller('clients')
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
    findOne(@Param('uuid') id: number) {
        return this.clientService.findOneById(id);
    }

    @Patch(':uuid')
    update(@Param('uuid') id: number, @Body() updateClientDto: CreateOrUpdateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }
}
