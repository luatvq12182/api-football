import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { Competition } from 'src/constants';
import { sleep } from 'src/utils';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    private slot = 10;

    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @Interval(200000)
    async handleInterval() {
        const cacheKeys = [
            Competition.Bundesliga + '_STANDINGS',
            Competition.ChampionsLeague + '_STANDINGS',
            Competition.EPL + '_STANDINGS',
            Competition.Eredivisie + '_STANDINGS',
            Competition.Euro + '_STANDINGS',
            Competition.Laliga + '_STANDINGS',
            Competition.Ligue1 + '_STANDINGS',
            Competition.PrimeiraLiga + '_STANDINGS',
            Competition.SerieA + '_STANDINGS',

            Competition.Bundesliga + '_MATCHES',
            Competition.ChampionsLeague + '_MATCHES',
            Competition.EPL + '_MATCHES',
            Competition.Eredivisie + '_MATCHES',
            Competition.Euro + '_MATCHES',
            Competition.Laliga + '_MATCHES',
            Competition.Ligue1 + '_MATCHES',
            Competition.PrimeiraLiga + '_MATCHES',
            Competition.SerieA + '_MATCHES',

            Competition.Bundesliga + '_MATCH_RESULTS',
            Competition.ChampionsLeague + '_MATCH_RESULTS',
            Competition.EPL + '_MATCH_RESULTS',
            Competition.Eredivisie + '_MATCH_RESULTS',
            Competition.Euro + '_MATCH_RESULTS',
            Competition.Laliga + '_MATCH_RESULTS',
            Competition.Ligue1 + '_MATCH_RESULTS',
            Competition.PrimeiraLiga + '_MATCH_RESULTS',
            Competition.SerieA + '_MATCH_RESULTS',
        ];

        for (let i = 0; i < cacheKeys.length; i++) {
            if (this.slot == 0) {
                await sleep(63000);
            }

            const cacheKey = cacheKeys[i];

            if (cacheKey.includes('STANDINGS') && this.slot > 0) {
                try {
                    this.slot = this.slot - 1;

                    const competitionCode = cacheKey.split('_')[0];

                    const res = await this.httpService
                        .get(
                            '/v4/competitions/' +
                                competitionCode +
                                '/standings',
                        )
                        .toPromise();

                    await this.cacheManager.set(cacheKey, res.data, 800000);
                } catch (error) {
                    // console.log('Error in ' + cacheKeys[i] + ': ', error);
                }

                setTimeout(() => {
                    this.slot = this.slot + 1;
                }, 60000);
            } else if (cacheKey.includes('MATCHES') && this.slot > 0) {
                try {
                    this.slot = this.slot - 1;
                    const competitionCode = cacheKey.split('_')[0];

                    const competitions: any = await this.cacheManager.get(
                        competitionCode + '_STANDINGS',
                    );

                    const endDate = competitions.season.endDate;

                    const today = new Date();
                    const dateFrom = `${today.getFullYear()}-${(
                        today.getMonth() + 1
                    )
                        .toString()
                        .padStart(2, '0')}-${today
                        .getDate()
                        .toString()
                        .padStart(2, '0')}`;

                    const res = await this.httpService
                        .get(
                            `/v4/competitions/${competitionCode}/matches?dateFrom=${dateFrom}&dateTo=${endDate}`,
                        )
                        .toPromise();

                    await this.cacheManager.set(cacheKey, res.data, 800000);
                } catch (error) {
                    // console.log('Error in ' + cacheKeys[i] + ': ', error);
                }

                setTimeout(() => {
                    this.slot = this.slot + 1;
                }, 60000);
            } else if (cacheKey.includes('MATCH_RESULTS') && this.slot > 0) {
                try {
                    this.slot = this.slot - 1;

                    const competitionCode = cacheKey.split('_')[0];

                    const competitions: any = await this.cacheManager.get(
                        competitionCode + '_STANDINGS',
                    );
                    const startDate = competitions.season.startDate;

                    const today = new Date();
                    const dateTo = `${today.getFullYear()}-${(
                        today.getMonth() + 1
                    )
                        .toString()
                        .padStart(2, '0')}-${today
                        .getDate()
                        .toString()
                        .padStart(2, '0')}`;

                    const res = await this.httpService
                        .get(
                            `/v4/competitions/${competitionCode}/matches?dateFrom=${startDate}&dateTo=${dateTo}`,
                        )
                        .toPromise();

                    await this.cacheManager.set(cacheKey, res.data, 800000);
                } catch (error) {
                    // console.log('Error in ' + cacheKeys[i] + ': ', error);
                }

                setTimeout(() => {
                    this.slot = this.slot + 1;
                }, 60000);
            }
        }
    }
}
