import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DomainRepository } from './modules/domains/domain.repository';
import { UserRepository } from './modules/users/user.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([UserRepository,DomainRepository]),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
