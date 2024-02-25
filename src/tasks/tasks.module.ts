import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        CacheModule.register(),
        HttpModule.register({
            baseURL: process.env.FOOTBALL_SERVICE,
            headers: {
                'X-Auth-Token': process.env.API_TOKEN,
            },
        }),
    ],
    providers: [TasksService],
})
export class TasksModule {}
