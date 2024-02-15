import { Competition, DayLabels, StageLabel } from 'src/constants';

const genTableStandings = (
    competition: string,
    data,
    isMobile: number,
    showNote: number,
) => {
    if (['CL', 'EC'].includes(competition)) {
        return `
            ${data
                .map((table) => {
                    return `
                    <div class="block-bangdiem">
                        <table class="tbl-data" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th colspan="2" class="th-name">Bảng ${
                                        table.group.split(' ')[1]
                                    }</th>
                                    <th>Trận</th>
                                    ${
                                        !isMobile
                                            ? `
                                                <th>Thắng</th>
                                                <th>Hòa</th>
                                                <th>Bại</th>
                                                <th>BT</th>
                                                <th>BB</th>
                                            `
                                            : ''
                                    }
                                    <th>+/-</th>
                                    <th>Điểm</th>
                                </tr>
                            </thead>
            
                            <tbody>
                                ${table.table
                                    .map((tr, index) => {
                                        const position = tr.position;
                                        const teamName = tr.team.shortName;
                                        const teamLogo = tr.team.crest;

                                        let trClass = '';

                                        if (position <= 2) {
                                            trClass = 'tier-1';
                                        }

                                        if (position == 3) {
                                            trClass = 'tier-2';
                                        }

                                        return `
                                            <tr class="${trClass}">
                                                <td class="td-stt">${
                                                    index + 1
                                                }</td>
                                                <td class="td-name">
                                                    <span class="flexbox">
                                                        <img src="${teamLogo}" alt="${teamName}">
                                                        <span class="name">${teamName}</span>
                                                    </span>
                                                </td>
                                                ${
                                                    !isMobile
                                                        ? `
                                                        <td>${tr.playedGames}</td>
                                                        <td>${tr.won}</td>
                                                        <td>${tr.draw}</td>
                                                        <td>${tr.lost}</td>
                                                        <td>${tr.goalsFor}</td>
                                                    `
                                                        : ''
                                                }
                                                <td>${tr.goalsAgainst}</td>
                                                <td>${tr.goalDifference}</td>
                                                <td><strong>${
                                                    tr.points
                                                }</strong></td>
                                            </tr>
                                        `;
                                    })
                                    .join('')}
                            </tbody>
                        </table>
                    </div>                 
                `;
                })
                .join('')}

            ${
                showNote
                    ? `<div class="block width_common block-node-bxh mb20">
                <div class="note-round">
                    <div class="it-note next-round flexbox">
                        <span class="ico"></span>
                        <span class="note-txt">Vòng tiếp theo</span>
                    </div>
                    <div class="it-note next-round-2 flexbox">
                        <span class="ico"></span>
                        <span class="note-txt">${
                            competition === 'EC'
                                ? 'Có thể vào vòng tiếp theo'
                                : 'Vòng bảng UEFA Europa'
                        }</span>
                    </div>
                </div>
                <div class="note-round">
                    <div class="it-note next-round flexbox">
                        <span class="text">BT:</span>
                        <span class="note-txt"> Bàn thắng </span>
                    </div>
                    <div class="it-note next-round-2 flexbox">
                        <span class="text">BB:</span>
                        <span class="note-txt"> Bàn bại</span>
                    </div>
                </div>
            </div>`
                    : ''
            }                
        `;
    }

    return `
        <div class="block-bangdiem">
            <table class="tbl-data" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th colspan="2" class="th-name">Thứ hạng</th>
                        <th>Trận</th>
                        ${
                            !isMobile
                                ? `
                                    <th>Thắng</th>
                                    <th>Hòa</th>
                                    <th>Bại</th>
                                    <th>BT</th>
                                    <th>BB</th>
                                `
                                : ''
                        }
                        <th>+/-</th>
                        <th>Điểm</th>
                    </tr>
                </thead>

                <tbody>
                    ${data[0].table
                        .map((tr) => {
                            const position = tr.position;
                            const teamName = tr.team.shortName;
                            const teamLogo = tr.team.crest;

                            const trClass = genClassForTier(
                                competition,
                                position,
                            );

                            return `
                                <tr class="${trClass}">
                                    <td class="td-stt">${position}</td>
                                    <td class="td-name">
                                        <span class="flexbox">
                                            <img src="${teamLogo}" alt="${teamName}">
                                            <span class="name">${teamName}</span>
                                        </span>
                                    </td>
                                    ${
                                        !isMobile
                                            ? `
                                            <td>${tr.playedGames}</td>
                                            <td>${tr.won}</td>
                                            <td>${tr.draw}</td>
                                            <td>${tr.lost}</td>
                                            <td>${tr.goalsFor}</td>
                                        `
                                            : ''
                                    }
                                    <td>${tr.goalsAgainst}</td>
                                    <td>${tr.goalDifference}</td>
                                    <td><strong>${tr.points}</strong></td>
                                </tr>
                            `;
                        })
                        .join('')}
                </tbody>
            </table>
        </div>

        ${
            showNote
                ? `
                <div class="block width_common block-node-bxh mb20">
                    <div class="note-round">
                        ${genNoteForTier(competition)}
                    </div>
                    <div class="note-round">
                        <div class="it-note next-round flexbox">
                            <span class="text">BT:</span>
                            <span class="note-txt"> Bàn thắng </span>
                        </div>
                        <div class="it-note next-round-2 flexbox">
                            <span class="text">BB:</span>
                            <span class="note-txt"> Bàn bại</span>
                        </div>
                    </div>
                </div>
                `
                : ''
        }
    `;
};

const genClassForTier = (competition, position) => {
    if (
        ([
            Competition.EPL,
            Competition.SerieA,
            Competition.Laliga,
            Competition.Bundesliga,
        ].includes(competition) &&
            position <= 4) ||
        (competition === Competition.Ligue1 && position <= 3) ||
        (competition === Competition.Eredivisie && position <= 2) ||
        (competition === Competition.PrimeiraLiga && position == 1)
    ) {
        return 'tier-1';
    }

    if (
        ([
            Competition.EPL,
            Competition.SerieA,
            Competition.Laliga,
            Competition.Bundesliga,
        ].includes(competition) &&
            position == 5) ||
        (competition === Competition.Ligue1 && position == 4) ||
        (competition === Competition.Eredivisie && position == 3) ||
        (competition === Competition.PrimeiraLiga && position == 2)
    ) {
        return 'tier-2';
    }

    if (
        ([Competition.Laliga, Competition.Bundesliga].includes(competition) &&
            position == 6) ||
        (competition === Competition.Ligue1 && position == 5) ||
        (competition === Competition.Eredivisie && position == 4) ||
        (competition === Competition.PrimeiraLiga && position == 3)
    ) {
        return 'tier-3';
    }

    if (competition === Competition.PrimeiraLiga && position == 4) {
        return 'tier-4';
    }

    if (
        [
            Competition.Bundesliga,
            Competition.Ligue1,
            Competition.Eredivisie,
            Competition.PrimeiraLiga,
        ].includes(competition) &&
        position == 16
    ) {
        return 'tier-5';
    }

    if (
        ([Competition.EPL, Competition.SerieA, Competition.Laliga].includes(
            competition,
        ) &&
            position >= 18) ||
        ([
            Competition.Bundesliga,
            Competition.Ligue1,
            Competition.Eredivisie,
            Competition.PrimeiraLiga,
        ].includes(competition) &&
            position >= 17)
    ) {
        return 'tier-6';
    }

    return '';
};

const genNoteForTier = (competition) => {
    let html = `
        <div class="it-note tier-1 flexbox">
            <span class="ico"></span>
            <span class="note-txt">Vòng bảng Vô địch các CLB châu Âu</span>
        </div>    
    `;

    if (
        [
            Competition.EPL,
            Competition.SerieA,
            Competition.Laliga,
            Competition.Bundesliga,
        ].includes(competition)
    ) {
        html += `
            <div class="it-note tier-2 flexbox">
                <span class="ico"></span>
                <span class="note-txt">Vòng bảng UEFA Europa</span>
            </div>
        `;
    }

    if (
        [
            Competition.Ligue1,
            Competition.Eredivisie,
            Competition.PrimeiraLiga,
        ].includes(competition)
    ) {
        html += `
            <div class="it-note tier-2 flexbox">
                <span class="ico"></span>
                <span class="note-txt">Vòng loại Vô địch các CLB châu Âu</span>
            </div>
        `;
    }

    if ([Competition.Laliga, Competition.Bundesliga].includes(competition)) {
        html += `
            <div class="it-note tier-3 flexbox">
                <span class="ico"></span>
                <span class="note-txt">Vòng loại UEFA Europa Conference</span>
            </div>
        `;
    }

    if ([Competition.Ligue1, Competition.PrimeiraLiga].includes(competition)) {
        html += `
            <div class="it-note tier-3 flexbox">
                <span class="ico"></span>
                <span class="note-txt">Vòng bảng UEFA Europa</span>
            </div>
        `;
    }

    if (competition === Competition.Eredivisie) {
        html += `
            <div class="it-note tier-3 flexbox">
                <span class="ico"></span>
                <span class="note-txt">Vòng loại UEFA Europa</span>
            </div>
        `;
    }

    if (competition === Competition.PrimeiraLiga) {
        html += `
            <div class="it-note tier-4 flexbox">
                <span class="ico"></span>
                <span class="note-txt">Vòng loại UEFA Europa Conference</span>
            </div>
        `;
    }

    if (
        [
            Competition.Bundesliga,
            Competition.Ligue1,
            Competition.Eredivisie,
            Competition.PrimeiraLiga,
        ].includes(competition)
    ) {
        html += `
            <div class="it-note tier-5 flexbox">
                <span class="ico"></span>
                <span class="note-txt">Trận quyết định đội xuống hạng</span>
            </div>
        `;
    }

    html += `
        <div class="it-note tier-6 flexbox">
            <span class="ico"></span>
            <span class="note-txt">Xuống hạng</span>
        </div>    
    `;

    return html;
};

const genTableTopScorers = (competition: string, scorers) => {
    return '';
};

const genMatches = (competition: any, matches) => {
    const matchesByDate = {};

    matches.forEach((match) => {
        const date = new Date(match.utcDate);

        const cvDate = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`; // 6/2/2024

        if (matchesByDate[cvDate]) {
            matchesByDate[cvDate].push(match);
        } else {
            matchesByDate[cvDate] = [match];
        }
    });

    return `
        ${Object.entries(matchesByDate)
            .map((match: any) => {
                const [d, m, y] = match[0].split('/');
                const date = new Date(`${y}-${m}-${d}`);
                const day = date.getDay();

                const matchday = match[1][0]?.matchday;
                const stage = match[1][0]?.stage;
                const matches = match[1];
                const textVongDau = genTextVongDau(
                    competition,
                    stage,
                    matchday,
                );

                return `
                    <div class="width_common wvd content-block block-lichdau d-flex mb20">
                        <div class="vongdau">
                            <div class="wvd date-vongdau">${DayLabels[day]}, ${
                    match[0]
                }</div>
                            <div class="wvd text-vongdau">
                                ${textVongDau}
                            </div>

                            ${matches
                                .map((m) => {
                                    const d = new Date(m.utcDate);
                                    const time = `${d
                                        .getHours()
                                        .toString()
                                        .padStart(2, '0')}:${d
                                        .getMinutes()
                                        .toString()
                                        .padStart(2, '0')}`;
                                    const homeTeam = m.homeTeam;
                                    const awayTeam = m.awayTeam;

                                    return `
                                        <div class="wvd">
                                            <a class="doidau ketqua d-flex align-items-center justify-content-center" href="#">
                                                <div style="width: 450px;" class="d-flex align-items-center justify-content-center">
                                                    <div style="width: 45%;" class="doibong doi-1 d-flex justify-content-end">
                                                        <span class="name">${homeTeam.shortName}</span>
                                                        <span class="avatar d-flex align-items-center"><img src="${homeTeam.crest}" alt="${homeTeam.shortName}"></span>
                                                    </div>
                                                    <div style="width: 10%;" class="ti-so d-flex">
                                                        <span class="so">
                                                            ${time}
                                                        </span>
                                                    </div>
                                                    <div style="width: 45%;" class="doibong doi-2 d-flex">
                                                        <span class="avatar d-flex align-items-center"><img src="${awayTeam.crest}" alt="${awayTeam.shortName}"></span>
                                                        <span class="name">${awayTeam.shortName}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    `;
                                })
                                .join('')}
                        </div>
                    </div>                               
                `;
            })
            .join('')}
    `;
};

const genMatchResults = (competition: string, matches) => {
    const matchesByDate = {};

    matches.forEach((match) => {
        const date = new Date(match.utcDate);

        const cvDate = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`; // 6/2/2024

        if (matchesByDate[cvDate]) {
            matchesByDate[cvDate].push(match);
        } else {
            matchesByDate[cvDate] = [match];
        }
    });

    return `
        ${Object.entries(matchesByDate)
            .map((match: any) => {
                const [d, m, y] = match[0].split('/');
                const date = new Date(`${y}-${m}-${d}`);
                const day = date.getDay();

                const matchday = match[1][0]?.matchday;
                const stage = match[1][0]?.stage;
                const matches = match[1];
                const textVongDau = genTextVongDau(
                    competition,
                    stage,
                    matchday,
                );

                return `
                    <div class="width_common wvd content-block block-lichdau d-flex mb20">
                        <div class="vongdau">
                            <div class="wvd date-vongdau">${DayLabels[day]}, ${
                    match[0]
                }</div>
                            <div class="wvd text-vongdau">
                                ${textVongDau}
                            </div>

                            ${matches
                                .map((m) => {
                                    const d = new Date(m.utcDate);
                                    const time = `${d
                                        .getHours()
                                        .toString()
                                        .padStart(2, '0')}:${d
                                        .getMinutes()
                                        .toString()
                                        .padStart(2, '0')}`;
                                    const homeTeam = m.homeTeam;
                                    const awayTeam = m.awayTeam;

                                    const scoreFullTime = `${
                                        m?.score?.fullTime?.home ?? '...'
                                    } - ${m?.score?.fullTime?.away ?? '...'}`;
                                    const scoreHalfTime = `${
                                        m?.score?.halfTime?.home ?? '...'
                                    } - ${m?.score?.halfTime?.away ?? '...'}`;

                                    return `
                                        <div class="wvd">
                                            <a class="doidau ketqua d-flex align-items-center justify-content-between" href="#">
                                                <span class="time">${time}</span>

                                                <div style="width: 450px;" class="d-flex align-items-center justify-content-center">
                                                    <div style="width: 45%;" class="doibong doi-1 d-flex justify-content-end">
                                                        <span class="name">${homeTeam.shortName}</span>
                                                        <span class="avatar d-flex align-items-center"><img src="${homeTeam.crest}" alt="${homeTeam.shortName}"></span>
                                                    </div>
                                                    <div style="width: 10%;" class="ti-so d-flex">
                                                        <span class="so">
                                                            ${scoreFullTime}
                                                        </span>
                                                        <span class="text-hiep">H1: ${scoreHalfTime}</span>
                                                    </div>
                                                    <div style="width: 45%;" class="doibong doi-2 d-flex">
                                                        <span class="avatar d-flex align-items-center"><img src="${awayTeam.crest}" alt="${awayTeam.shortName}"></span>
                                                        <span class="name">${awayTeam.shortName}</span>
                                                    </div>
                                                </div>

                                                <span class="detail-match"><i class="ic-arown-long"></i></span>
                                            </a>
                                        </div>
                                    `;
                                })
                                .join('')}
                        </div>
                    </div>                               
                `;
            })
            .join('')}
    `;
};

const genTextVongDau = (competition: any, stage: any, matchday: any) => {
    if (StageLabel[stage]) {
        if (['FINAL', 'THIRD_PLACE'].includes(stage)) {
            return StageLabel[stage];
        }

        if (stage === 'GROUP_STAGE') {
            if (competition === Competition.ChampionsLeague) {
                return `${StageLabel[stage]} · Ngày thi đấu ${matchday}/6`;
            }

            if (competition === Competition.Euro) {
                return `${StageLabel[stage]} · Ngày thi đấu ${matchday}/3`;
            }

            return StageLabel[stage];
        }

        return `${StageLabel[stage]} · Lượt ${matchday}/2`;
    } else {
        return `Vòng ${matchday}`;
    }
};

export { genTableStandings, genTableTopScorers, genMatches, genMatchResults };
