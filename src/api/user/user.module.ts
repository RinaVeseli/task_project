import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomRepositoryModule } from '../../common/db/CustomRepository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './entities/reset-password.entity';
import { UserRepository } from './repository/user.repository';
import { ReportRepository } from '../reports/repository/report.repository';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      UserRepository,
      ReportRepository,
    ]),
    TypeOrmModule.forFeature([PasswordReset]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
