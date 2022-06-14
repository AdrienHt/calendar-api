import {Column, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {randomUUID} from "crypto";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;
    @Column()
    uuid: string = randomUUID();
    @Column()
    created_at: number;
    @Column()
    updated_at: number = Date.now();
}