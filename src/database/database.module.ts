import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from '../config';
import { ConfigType } from '@nestjs/config';

const API_KEY = '12324';
const API_Key_PROD = 'PROD12313121';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_Key_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
