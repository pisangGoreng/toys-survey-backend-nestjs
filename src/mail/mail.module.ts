import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
// import { ConfigService } from '@nestjs/config';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.gmail.com',
          service: 'gmail',
          secure: false,
          auth: {
            type: 'OAuth2',
            user: '7ofpentacles@gmail.com',
            accessToken:
              '1//04icpd47ZlxQcCgYIARAAGAQSNwF-L9IrxXPUUGRpzguKNrbdYDcHB4lAPdd2GOI9r35t2-ojqCh872cg4xL8NVAqvdVxhk9wG_o',
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      // inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
