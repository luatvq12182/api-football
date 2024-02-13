import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FootballController } from 'src/controllers/football.controller';
import { FootballService } from 'src/services/football.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule.register({
            baseURL: process.env.FOOTBALL_SERVICE,
            headers: {
                'X-Auth-Token': process.env.API_TOKEN,
            },
        }),
    ],
    providers: [FootballService],
    controllers: [FootballController],
})
export class FootballModule {}
