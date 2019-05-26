import { JsTsMapper } from 'js-ts-mapper';
import { BaseCurrencyDto } from 'app/models/classes';

export function getBaseCurrencyMock(): BaseCurrencyDto {
    const responseStr = `{"base":"EUR",
            "rates":{"BGN":1.9558,"NZD":1.7109,"ILS":4.0331,"RUB":72.1352,"CAD":1.5053,"USD":1.1187,"PHP":58.403,"CHF":1.1215,"ZAR":16.1554,"AUD":1.6205,"JPY":122.61,"TRY":6.7988,"HKD":8.7806,"MYR":4.6857,"THB":35.636,"HRK":7.4258,"NOK":9.7558,"IDR":16100.89,"DKK":7.4678,"CZK":25.83,"HUF":325.95,"GBP":0.88318,"MXN":21.3057,"KRW":1328.29,"ISK":138.3,"SGD":1.5403,"BRL":4.5247,"PLN":4.2974,"INR":77.8,"RON":4.7619,"CNY":7.7206,"SEK":10.7098},
            "date":"2019-05-24"}`;
    const responseObj = JSON.parse(responseStr);
    const mapper = new JsTsMapper();

    return mapper.deserialize<BaseCurrencyDto>(responseObj, BaseCurrencyDto);
}
