import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Query,
} from '@nestjs/common';
import { FootballService } from 'src/services/football.service';

@Controller('football')
export class FootballController {
    constructor(private readonly footballService: FootballService) {}

    @Get('areas/:id')
    async getArea(@Param('id') id: number) {
        try {
            const res = await this.footballService.getArea(id);

            return res.data;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('areas')
    async getAreas() {
        try {
            const res = await this.footballService.getAreas();

            return res.data;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('competitions')
    async getCompetitions() {
        try {
            const res = await this.footballService.getCompetitions();

            return res.data;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('competitions/:code')
    async getCompetition(@Param('code') code: string) {
        try {
            const res = await this.footballService.getCompetition(code);

            return res.data;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('competitions/:code/standings')
    async getCompetitionStandings(
        @Param('code') code: string,
        @Query('cvHtml') cvHtml: number,
        @Query('isMobile') isMobile: number,
        @Query('showNote') showNote: number,
        @Query('season') season: number,
    ) {
        return await this.footballService.getCompetitionStandings(
            code,
            +cvHtml,
            +isMobile,
            +showNote,
            season,
        );
    }

    @Get('competitions/:code/matches')
    async getCompetitionMatches(
        @Param('code') code: string,
        @Query('cvHtml') cvHtml: number,
    ) {
        return this.footballService.getCompetitionMatches(code, +cvHtml);
    }

    @Get('competitions/:code/match-results')
    async getMatchResults(
        @Param('code') code: string,
        @Query('cvHtml') cvHtml: number,
    ) {
        return this.footballService.getMatchResults(code, +cvHtml);
    }
}
