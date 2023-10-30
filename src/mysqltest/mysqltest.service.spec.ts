import { Test, TestingModule } from '@nestjs/testing';
import { MysqltestService } from './mysqltest.service';

describe('MysqltestService', () => {
  let service: MysqltestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MysqltestService],
    }).compile();

    service = module.get<MysqltestService>(MysqltestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
