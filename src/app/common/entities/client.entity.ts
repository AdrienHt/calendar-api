import {Column, Entity} from "typeorm";
import {BaseEntity} from "./base.entity";

@Entity()
export class Client extends BaseEntity {
    constructor(partial: Partial<Client>) {
        super();
        Object.assign(this, partial);

        if (this.created_at) {
            this.created_at = Date.now();
        }
    }

    update(partial: Partial<Client>) {
        Object.assign(this, partial);
    }

    @Column()
    name: string;
}
