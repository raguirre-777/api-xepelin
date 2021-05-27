import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SigninDto } from './modules/auth/dto/signin.dto';
import { SignupDto } from './modules/auth/dto/signup.dto';
import { Domain } from './modules/domains/domain.entity';
import { User } from './modules/users/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/shorten')
  async shorten(@Body() domain: Domain): Promise<Domain> {
    const savedDomain: Domain= await this.appService.shorten(domain);
    return savedDomain;
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Domain> {
    const domain = await this.appService.get(id);
    return domain;
  }

  @Get('/domain')
  async getDomains(): Promise<Domain[]> {
    const domains = await this.appService.getDomain();
    return domains;
  }

  // @Post()
  // async createUser(@Body() user: User): Promise<User> {
  //   const createdUser = await this.appService.register(user);
  //   return null;
  // }

  // @Patch(':id')
  // async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
  //   const updatedUser = await this.appService.register(id, user);
  //   return true;
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id', ParseIntPipe) id: number) {
  //   await this.appService.delete(id);
  //   return true;
  // }

  @Post('/signup')// crear
  async signup(@Body() signupDto: SignupDto): Promise<void> {
       return this.appService.register(signupDto);
  }

  @Post('/signin') // login
  async signin(@Body() signinDto: SigninDto) {
      return this.appService.login(signinDto);
  }

}