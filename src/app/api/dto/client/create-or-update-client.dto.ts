import {IsNotEmpty} from "class-validator";
import {ClientExists} from "../../../common/validator/client.exists.validator";

export class CreateOrUpdateClientDto {
    @IsNotEmpty()
    @ClientExists(false, 'name')
    name: string
}
