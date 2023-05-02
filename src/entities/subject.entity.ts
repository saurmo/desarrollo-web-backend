import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    constructor() {
        this.id = 0;
        this.name = ""
        this.description = ""
    }
}