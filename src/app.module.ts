import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { NestEmitterModule } from 'nest-emitter';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { config } from './common/db/dataSource/data-source.config';
import { EventEmitter } from 'stream';
import { MailService } from './services/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ProjectModule } from './api/project/project.module';
import { ProjectController } from './api/project/project.controller';
import { ProjectService } from './api/project/project.service';
import { User } from './api/user/entities/user.entity';
import { Project } from './api/project/entities/project.entity';
import { RoleModule } from './api/role/role.module';
import { ReportsController } from './api/reports/controller/reports.controller';
import { ReportsModule } from './api/reports/reports.module';
import { TasksModule } from './api/tasks/tasks.module';
import { MediaModule } from './api/media/media.module';
import { SettingsModule } from './api/settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config as DataSourceOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SENDER_MAIL,
      },
      template: {
        dir: __dirname + '/../templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forFeature([User, Project]),
    NestEmitterModule.forRoot(new EventEmitter()),
    AuthModule,
    UserModule,
    ProjectModule,
    RoleModule,
    ReportsModule,
    TasksModule,
    MediaModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: AtGuard },
    AppService,
    MailService,
    Logger,
  ],
})
export class AppModule {}
