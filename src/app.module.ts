import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FootballModule } from './modules/football.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        FootballModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
