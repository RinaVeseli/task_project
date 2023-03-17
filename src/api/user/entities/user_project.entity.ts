// import { Project } from "src/api/project/entities/project.entity";
// import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
// import { User } from "./user.entity";
// @Entity('user_project')
// export class UserProject{

//     @PrimaryColumn({name: "user_id"})
//     userId:number;

//     @PrimaryColumn({name: 'project_id'})
//     projectId: number;

//     @ManyToOne(()=>User, user=>user.projects, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
//     @JoinColumn([{name: 'user_id', referencedColumnName:'id'}])
//     users:User[];

//     @ManyToOne(()=>Project, project=>project.users, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
//     @JoinColumn([{name: 'project_id', referencedColumnName:'id'}])
//     projects:Project[];
// }