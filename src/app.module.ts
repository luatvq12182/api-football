import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { FootballModule } from './modules/football.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        FootballModule,
        CacheModule.register(),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
