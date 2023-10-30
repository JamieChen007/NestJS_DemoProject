import { Module } from '@nestjs/common';
import { MysqltestService } from './mysqltest.service';
import { MysqltestController } from './mysqltest.controller';
import { Mysqltest } from './entities/mysqltest.entity';
import { MysqltestTag } from './entities/mysqltestTag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Mysqltest, MysqltestTag])],
  controllers: [MysqltestController],
  providers: [MysqltestService],
})
export class MysqltestModule {}
