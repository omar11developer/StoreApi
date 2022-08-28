import { Module, Global } from '@nestjs/common';

const API_KEY = '12324';
const API_Key_PROD = 'PROD12313121';
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_Key_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
