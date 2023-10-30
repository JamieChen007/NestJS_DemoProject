import { PartialType } from '@nestjs/swagger';
import { CreateMysqltestDto } from './create-mysqltest.dto';

export class UpdateMysqltestDto extends PartialType(CreateMysqltestDto) {}
