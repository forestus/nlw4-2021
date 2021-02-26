
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity("surveys_users")
class SurveyUser {

    @PrimaryColumn()
    readonly id: string; // impede que o user tenha acesso a modificação desse valor

    @Column()
    user_id: string;

    @Column()
    survey_id: string;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
export { SurveyUser };