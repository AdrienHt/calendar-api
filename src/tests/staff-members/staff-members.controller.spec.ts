import { Test, TestingModule } from '@nestjs/testing';
import { StaffMemberController } from '../../app/api/controllers/staff-member.controller';
import { StaffMemberService } from '../../app/common/services/staff-member.service';

describe('StaffMembersController', () => {
  let controller: StaffMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffMemberController],
      providers: [StaffMemberService],
    }).compile();

    controller = module.get<StaffMemberController>(StaffMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
