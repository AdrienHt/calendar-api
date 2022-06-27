import {Column, Entity} from 'typeorm';
import {BaseEntity} from "./base.entity";

@Entity()
export class StaffMember extends BaseEntity {
    constructor(partial: Partial<StaffMember>) {
        super();
        Object.assign(this, partial);

        if (!this.created_at) {
            this.created_at = Date.now();
        }
    }

    update(partial: Partial<StaffMember>) {
        Object.assign(this, partial);
    }

    @Column()
    first_name: string;

    @Column()
    last_name: string;
}
