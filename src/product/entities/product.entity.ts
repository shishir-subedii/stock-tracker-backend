import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    sku: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    currentStock: number;

    @Column('int')
    totalRestocked: number;

    @Column('int')
    reorderLevel: number;

    @Column()
    companyId: string;

    @Column()
    adminId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
