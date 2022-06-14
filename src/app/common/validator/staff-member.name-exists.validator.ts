import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {StaffMemberService} from "../services/staff-member.service";
import {Injectable} from "@nestjs/common";

export const StaffNameMemberExists = (validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: StaffMemberNameExistsConstraint,
        });
    };
};

@ValidatorConstraint({name: "StaffNameMemberExists"})
@Injectable()
export class StaffMemberNameExistsConstraint implements ValidatorConstraintInterface {
    constructor(protected staffMembersService: StaffMemberService) {
    }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const firstName = args.object['first_name']
        const lastName = args.object['last_name']

        if (!firstName || !lastName) {
            return true;
        }

        return !await this.staffMembersService.existsWithName(firstName, lastName);
    }

    defaultMessage(args: ValidationArguments) {
        return `Staff member ${args.object['first_name']} ${args.object['last_name']} already exists`;
    }
}