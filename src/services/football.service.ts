import * as querystring from 'querystring';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
    genMatchResults,
    genMatches,
    genTableStandings,
    genTableTopScorers,
} from 'src/utils';

@Injectable()
export class FootballService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    getArea(id: number) {
        return this.httpService.get('/v4/areas/' + id).toPromise();
    }

    getAreas() {
        return this.httpService.get('/v4/areas').toPromise();
    }

    getCompetitions() {
        return this.httpService.get('/v4/competitions').toPromise();
    }

    getCompetition(code: string) {
        return this.httpService.get('/v4/competitions/' + code).toPromise();
    }

    async getCompetitionStandings(
        code: string,
        cvHtml: number,
        isMobile: number,
        showNote: number,
        season?: number,
    ) {
        try {
            const cacheData: any = await this.cacheManager.get(
                code + '_STANDINGS',
            );

            if (cacheData) {
                if (cvHtml) {
                    return {
                        html: genTableStandings(
                            code,
                            cacheData.standings,
                            isMobile,
                            showNote,
                        ),
                    };
                } else {
                    return cacheData;
                }
            } else {
                const queryParamsString = querystring.stringify({ season });

                const res = await this.httpService
                    .get(
                        '/v4/competitions/' +
                            code +
                            '/standings?' +
                            queryParamsString,
                    )
                    .toPromise();

                if (cvHtml) {
                    return {
                        html: genTableStandings(
                            code,
                            res.data.standings,
                            isMobile,
                            showNote,
                        ),
                    };
                } else {
                    return res.data;
                }
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getCompetitionTopScorers(
        code: string,
        cvHtml: number,
        season?: number,
    ) {
        try {
            const queryParamsString = querystring.stringify({ season });

            const res = await this.httpService
                .get(
                    '/v4/competitions/' +
                        code +
                        '/standings?' +
                        queryParamsString,
                )
                .toPromise();

            if (cvHtml) {
                return {
                    html: genTableTopScorers(code, res.data.scorers),
                };
            } else {
                return res.data;
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getCompetitionMatches(code: string, cvHtml: number) {
        try {
            const cacheData: any = await this.cacheManager.get(
                code + '_MATCHES',
            );

            if (cacheData) {
                if (cvHtml) {
                    return {
                        html: genMatches(
                            code,
                            cacheData.matches.filter((e) => {
                                return !!e.awayTeam.name;
                            }),
                        ),
                    };
                } else {
                    return cacheData;
                }
            } else {
                const competitions = await this.httpService
                    .get('/v4/competitions/' + code)
                    .toPromise();
                const endDate = competitions.data.currentSeason.endDate;

                const today = new Date();
                const dateFrom = `${today.getFullYear()}-${(
                    today.getMonth() + 1
                )
                    .toString()
                    .padStart(2, '0')}-${today
                    .getDate()
                    .toString()
                    .padStart(2, '0')}`;

                const matches = await this.httpService
                    .get(
                        `/v4/competitions/${code}/matches?dateFrom=${dateFrom}&dateTo=${endDate}`,
                    )
                    .toPromise();

                if (cvHtml) {
                    return {
                        html: genMatches(
                            code,
                            matches.data.matches.filter((e) => {
                                return !!e.awayTeam.name;
                            }),
                        ),
                    };
                } else {
                    return matches.data;
                }
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getMatchResults(code: string, cvHtml: number) {
        try {
            const cacheData: any = await this.cacheManager.get(
                code + '_MATCH_RESULTS',
            );

            if (cacheData) {
                const matches = JSON.parse(JSON.stringify(cacheData.matches));

                if (cvHtml) {
                    return {
                        html: genMatchResults(code, matches.reverse()),
                    };
                } else {
                    return cacheData;
                }
            } else {
                const competitions = await this.httpService
                    .get('/v4/competitions/' + code)
                    .toPromise();
                const startDate = competitions.data.currentSeason.startDate;

                const today = new Date();
                const dateTo = `${today.getFullYear()}-${(today.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}-${today
                    .getDate()
                    .toString()
                    .padStart(2, '0')}`;

                const matches = await this.httpService
                    .get(
                        `/v4/competitions/${code}/matches?dateFrom=${startDate}&dateTo=${dateTo}`,
                    )
                    .toPromise();

                if (cvHtml) {
                    return {
                        html: genMatchResults(
                            code,
                            matches.data.matches.reverse(),
                        ),
                    };
                } else {
                    return matches.data;
                }
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async testCache(key: string) {
        return await this.cacheManager.get(key);
    }
}
