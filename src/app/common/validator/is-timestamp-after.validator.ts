import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Injectable} from "@nestjs/common";

export const IsTimeStampAfter = (skipOnEmpty: Boolean, field: string, validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsTimeStampAfterConstraint,
            constraints: [skipOnEmpty, field]
        });
    };
};

@ValidatorConstraint({name: "IsTimeStamp"})
@Injectable()
export class IsTimeStampAfterConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        if (args.constraints[0] && !args.value) {
            return true;
        }

        return (new Date(args.value)).getTime() > (new Date(args.object[args.constraints[1]])).getTime();
    }

    defaultMessage(args: ValidationArguments) {
        return `The ${args.property} must be after the ${args.constraints[1]}`;
    }
}