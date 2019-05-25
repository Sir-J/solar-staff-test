import { JsTsCustomConvert } from 'js-ts-mapper';

import { RateDto } from '../models/classes/rate.dto';

export class RateConverter implements JsTsCustomConvert<Array<RateDto>> {
    serialize(value: Array<RateDto>): Object {
        const obj = {};

        value.forEach(item => (obj[item.name] = item.value));

        return obj;
    }
    deserialize(value: object): Array<RateDto> {
        let result = new Array<RateDto>();
        for (const val in value) {
            if (value[val]) {
                result.push(new RateDto(val, value[val]));
            }
        }
        result = result.sort((a: RateDto, b: RateDto) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }

            return 0;
        });
        return result;
    }
}
