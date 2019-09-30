import { JsTsCustomConvert } from 'js-ts-mapper';

import { RateDto } from '../models/classes/rate.dto';

export class RateConverter implements JsTsCustomConvert<Array<RateDto>> {
    serialize(value: Array<RateDto>): Object {
        const obj = {};

        value.forEach(item => (obj[item.name] = item.rate));

        return obj;
    }
    deserialize(value: object): Array<RateDto> {
        let result = new Array<RateDto>();
        for (const val in value) {
            if (value[val]) {
                result.push(new RateDto(val, value[val]));
            }
        }
        result = result.sort((item1: RateDto, item2: RateDto) => {
            if (item1.name > item2.name) {
                return 1;
            }
            if (item1.name < item2.name) {
                return -1;
            }

            return 0;
        });
        return result;
    }
}
