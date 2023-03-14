import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter } from 'stream';
import { InjectEventEmitter } from 'nest-emitter';
import { MailService } from './services/mail/mail.service';
import { Public } from './common/decorators/public.decorator';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectEventEmitter() private readonly emitter: EventEmitter,
    private readonly mailService: MailService,
  ) {}

  @Public()
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit(): any {
    this.emitter.on(
      'forgotPasswordMail',
      async (userToken) => await this.onForgotPasswordMail(userToken),
    );
  }

  private async onForgotPasswordMail(userToken: any) {
    this.mailService.forgotPassword(userToken);
  }
}
