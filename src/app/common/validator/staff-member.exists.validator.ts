import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {StaffMemberService} from "../services/staff-member.service";
import {Injectable} from "@nestjs/common";

export const StaffMemberExists = (shouldExists: boolean, validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: StaffMemberExistsConstraint,
            constraints: [shouldExists]
        });
    };
};

@ValidatorConstraint({name: "StaffMemberExists"})
@Injectable()
export class StaffMemberExistsConstraint implements ValidatorConstraintInterface {
    constructor(protected staffMembersService: StaffMemberService) {
    }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const exists = await this.staffMembersService.exists({where: {'id': value}});

        return args.constraints[0] ? exists : !exists
    }

    defaultMessage(args: ValidationArguments) {
        if (args.constraints[0]) {
            return `Staff member #${args.value} does not exist`;
        }

        return `Staff member already exists with ${args.property} = ${args.value}`;
    }
}