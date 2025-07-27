import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;
}
