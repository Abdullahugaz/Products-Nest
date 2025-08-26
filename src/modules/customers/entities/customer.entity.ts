import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
// import { AuditTrail } from './audit-trail.entity';
@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  Display_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  village: string;

  @Column({ default: 'draft' }) // Define the default value here
  status: string;
  Product: any;

  // @OneToMany(() => AuditTrail, (auditTrail) => auditTrail.customer)
  // auditTrail: AuditTrail[];
}
