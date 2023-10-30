import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateManagerDto,
  CreateAccountDto,
  CreateTransferInfoDto,
} from './dto/create-manager.dto';
import { Manager, Transfer } from './entities/manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager) private readonly account: Repository<Manager>,
    @InjectRepository(Transfer)
    private readonly transferRecord: Repository<Transfer>,
  ) {}

  async transfer(transferInfoDto: CreateTransferInfoDto) {
    // console.log('12121', params.fromId);

    // const fromId = params.fromId;
    // const toId = params.toId;
    // const amount = params.amount;
    try {
      return this.account.manager.transaction(async (manager) => {
        const fromAccountInfo = await this.account.findOne({
          where: { id: transferInfoDto.fromId },
        });
        const toAccountInfo = await this.account.findOne({
          where: { id: transferInfoDto.toId },
        });

        if (fromAccountInfo.money < transferInfoDto.amount) {
          console.log('money not enough');
          return 'money not enough';
        }
        manager.save(Manager, {
          id: transferInfoDto.fromId,
          money: fromAccountInfo.money - transferInfoDto.amount,
        });
        manager.save(Manager, {
          id: transferInfoDto.toId,
          money: toAccountInfo.money + transferInfoDto.amount,
        });

        this.transferRecord.save({
          fromId: transferInfoDto.fromId,
          toId: transferInfoDto.toId,
          amount: transferInfoDto.amount,
        });
        return 'transfer succeed';
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  create(createManagerDto: CreateManagerDto) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  // update(id: number, updateManagerDto: UpdateManagerDto) {
  //   return `This action updates a #${id} manager`;
  // }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
