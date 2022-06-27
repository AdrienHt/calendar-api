import {BaseEntity} from "./base.entity";
import {Column, Entity} from "typeorm";

@Entity()
export class Appointment extends BaseEntity {
    constructor(partial: Partial<Appointment>) {
        super();
        Object.assign(this, partial);

        if (!this.created_at) {
            this.created_at = Date.now();
        }
    }

    update(partial: Partial<Appointment>) {
        Object.assign(this, partial);
    }

    @Column()
    client_id: number;

    @Column()
    staff_member_id: number;

    @Column()
    start_at: number;

    @Column()
    end_at: number;

    @Column()
    name: string;
}
