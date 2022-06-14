import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../../app/api/controllers/client.controller';
import { ClientService } from '../../app/common/services/client.service';

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
