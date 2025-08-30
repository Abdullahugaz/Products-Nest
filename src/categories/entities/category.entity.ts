import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  category_name: string;

  @Column({ nullable: true })
  category_description?: string;

  // Self-referencing relationship for parent category
  @ManyToOne(() => Category, (category) => category.children, { nullable: true })
  parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children?: Category[];

  // ✅ Relation to products
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
