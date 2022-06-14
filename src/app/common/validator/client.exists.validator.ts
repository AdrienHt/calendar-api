import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Injectable} from "@nestjs/common";
import {ClientService} from "../services/client.service";

export const ClientExists = (shouldExists: boolean, targetAttribute: string, validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: ClientExistsConstraint,
            constraints: [shouldExists, targetAttribute]
        });
    };
};

@ValidatorConstraint({name: "ClientExists"})
@Injectable()
export class ClientExistsConstraint implements ValidatorConstraintInterface {
    constructor(protected clientService: ClientService) {
    }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const exists = await this.clientService.exists({where: {[args.constraints[1]]: value}});

        return args.constraints[0] ? exists : !exists
    }

    defaultMessage(args: ValidationArguments) {
        if (args.constraints[0]) {
            return `Client #${args.value} does not exist`;
        }

        return `Client ${args.value} already exists`;
    }
}