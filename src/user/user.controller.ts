import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Headers,
  HttpCode,
  Response,
  Session,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';

// specify a version for all api under user router
@Controller({
  path: 'user',
  version: '1',
})
// @Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCode(@Request() req, @Response() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    // this.findAll(query);

    // return captcha;

    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Body() Body, @Session() session) {
    console.log(Body, session.code);
    return {
      code: 200,
    };
  }

  // create(@Body() createUserDto: CreateUserDto) {
  //   console.log('body', createUserDto.name);

  //   return this.userService.create(createUserDto);
  // }
  @Get()
  findAll(@Query() query) {
    console.log('query', query);

    return { code: 200, message: query.name };
  }

  @Get(':id')
  // @HttpCode(500)
  // specify a version only for this findOne api
  // @Version('2')
  // ParseIntPipe是转换整型数字的管道 其他管道：ValidationPipe ParseFloatPipe ParseBoolPipe ParseArrayPipe ParseUUIDPipe ParseEnumPipe DefaultValuePipe
  findOne(@Param('id', ParseIntPipe) id: string, @Headers() headers) {
    console.log('id', id);
    console.log('typeof id', typeof id);
    console.log('headers', headers);

    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
