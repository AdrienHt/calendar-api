import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Injectable} from "@nestjs/common";

export const IsTimeStamp = (skipOnEmpty: Boolean, validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: TimestampConstraint,
            constraints: [skipOnEmpty]
        });
    };
};

@ValidatorConstraint({name: "IsTimeStamp"})
@Injectable()
export class TimestampConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        if (args.constraints[0] && !args.value) {
            return true;
        }

        return (new Date(args.value)).getTime() > 0;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a valid date`;
    }
}