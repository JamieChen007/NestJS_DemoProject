import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { Role, ReqUrl } from './role/role.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('guard')
@ApiBearerAuth()
@ApiTags('守卫接口Swagger')
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  //自定义装饰器
  @Role('admin12')
  @ApiOperation({ summary: '接口Summary', description: '接口详情swagger' })
  // @SetMetadata('role2', ['admin12'])
  findAll(@ReqUrl('123') url: string) {
    console.log(url, 'url');

    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'this is a id',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    description: 'page info',
  })
  @ApiResponse({ status: 403, description: 'iam 403' })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
