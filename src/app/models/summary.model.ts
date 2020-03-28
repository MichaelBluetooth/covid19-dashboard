export class SummaryResponse {
    Countries: SummaryModel[];
}

export class SummaryModel {
    Country: string;
    CountrySlug: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
}