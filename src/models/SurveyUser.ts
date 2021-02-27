
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Survey } from "./Survey";
import { User } from "./User";


@Entity("surveys_users")
class SurveyUser {

    @PrimaryColumn()
    readonly id: string; // impede que o user tenha acesso a modificação desse valor

    @Column()
    user_id: string;

    //EXIBE JUNTO AO EMAIL O USER JUNTO AO MESMO
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    survey_id: string;

    //EXIBE JUNTO AO EMAIL O SURVEY JUNTO AO MESMO
    @ManyToOne(() => Survey)
    @JoinColumn({ name: "survey_id" })
    survey: Survey;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;
    //cria um id random(hash)
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
export { SurveyUser };