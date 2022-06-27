import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Injectable} from "@nestjs/common";
import {AppointmentService} from "../services/appointment.service";

export const IsAvailable = (validationOptions?: ValidationOptions) => {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsAvailableConstraint
        });
    };
};

@ValidatorConstraint({name: "IsAvailable"})
@Injectable()
export class IsAvailableConstraint implements ValidatorConstraintInterface {
    constructor(protected appointmentService: AppointmentService) {
    }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        if (!args.property || !args.object['start_at'] || !args.object['end_at']) {
            return true;
        }

        if (args.property === 'staff_member_id') {
            return await this.appointmentService.isStaffMemberAvailable(args.value, args.object['start_at'], args.object['end_at']);
        }

        return await this.appointmentService.isClientAvailable(args.value, args.object['start_at'], args.object['end_at']);
    }

    defaultMessage(args: ValidationArguments) {
        return `The ${args.property === 'staff_member_id' ? 'staff member' : 'client'} is not available for theses dates`;
    }
}