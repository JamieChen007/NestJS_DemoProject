import { Injectable } from '@nestjs/common';
import { CreateMysqltestDto } from './dto/create-mysqltest.dto';
import { UpdateMysqltestDto } from './dto/update-mysqltest.dto';
import { Mysqltest } from './entities/mysqltest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationId, Repository } from 'typeorm';
import { MysqltestTag } from './entities/mysqltestTag.entity';

@Injectable()
export class MysqltestService {
  constructor(
    @InjectRepository(Mysqltest) private readonly user: Repository<Mysqltest>,
    @InjectRepository(MysqltestTag)
    private readonly tags: Repository<MysqltestTag>,
  ) {}

  create(createMysqltestDto: CreateMysqltestDto) {
    return 'This action adds a new mysqltest';
  }

  async addTags(params: { tags: string[]; userId: number }) {
    const userInfo = await this.user.findOne({ where: { id: params.userId } });
    // const userInfo = await this.user.findOne({ where: { id: params.userId } });
    if (!userInfo) {
      return false;
    }
    const tagList: MysqltestTag[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const T = new MysqltestTag();
      T.name = params.tags[i];
      await this.tags.save(T);
      tagList.push(T);
    }

    userInfo.tags = tagList;
    this.user.save(userInfo);

    return true;
  }

  async findAll() {
    const data = await this.user.find({
      relations: ['tags'],
    });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} mysqltest`;
  }

  update(id: number, updateMysqltestDto: UpdateMysqltestDto) {
    return `This action updates a #${id} mysqltest`;
  }

  remove(id: number) {
    return `This action removes a #${id} mysqltest`;
  }
}
