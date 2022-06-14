import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from '../../app/api/controllers/appointment.controller';
import { AppointmentService } from '../../app/common/services/appointment.service';

describe('AppointmentController', () => {
  let controller: AppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [AppointmentService],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
