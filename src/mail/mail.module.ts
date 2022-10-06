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
              'ya29.a0Aa4xrXOdvqCIqMXEsw7k563Kvnm5YF8QOQx3wz3q2ChgVZ3nzMvk-9uqlgJIdyGFTXGKlQq59J_FJ6wv8raBmAdCjNB6KMPn-WHpX6U6xBmEwH2aFd-Pui9m1EwDBxsjT1Q0O-sP8CTeTkvL7I0A413ktfhHaCgYKATASARESFQEjDvL9PEFwK-p2ZqWyiNrq2p9PYg0163',
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
