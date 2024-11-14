/* eslint-disable prettier/prettier */
import { UserEntity } from "src/models/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks') // Đặt tên bảng ở dạng số nhiều để phù hợp hơn
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    groupName: string; // Đổi tên thuộc tính để rõ nghĩa và camelCase

    @Column()
    boardName: string; // Đổi tên thuộc tính để rõ nghĩa và camelCase

    @Column()
    leader: string; // Đổi tên thuộc tính từ 'People' thành 'assignee' để rõ ràng hơn

    @Column({ default: 'pending' }) // Cài đặt giá trị mặc định cho status
    status: string;

    @ManyToOne(() => UserEntity, (user) => user.createdTasks, { eager: true })
    user: UserEntity;
}