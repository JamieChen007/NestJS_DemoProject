import { Test, TestingModule } from '@nestjs/testing';
import { MysqltestController } from './mysqltest.controller';
import { MysqltestService } from './mysqltest.service';

describe('MysqltestController', () => {
  let controller: MysqltestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MysqltestController],
      providers: [MysqltestService],
    }).compile();

    controller = module.get<MysqltestController>(MysqltestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
