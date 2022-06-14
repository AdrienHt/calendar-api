import { Test, TestingModule } from '@nestjs/testing';
import { StaffMemberService } from '../../app/common/services/staff-member.service';

describe('StaffMembersService', () => {
  let service: StaffMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffMemberService],
    }).compile();

    service = module.get<StaffMemberService>(StaffMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
