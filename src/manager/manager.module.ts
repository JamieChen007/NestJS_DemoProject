import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager, Transfer } from './entities/manager.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Manager, Transfer])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
