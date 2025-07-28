import { PrimaryGeneratedColumn } from "typeorm";

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    
}
