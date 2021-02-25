
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity("surveys")
class Survey {

    @PrimaryColumn()
    readonly id: string; // impede que o user tenha acesso a modificação desse valor

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
export { Survey };