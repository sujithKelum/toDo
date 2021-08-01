import { Column, Entity, OneToMany } from 'typeorm';
import { MasterEntity } from './master.entity';

@Entity()
export class ToDo extends MasterEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'tinyint', default: false })
  status: boolean;

  @Column({ type: 'tinyint', default: true })
  complete: boolean;

  @Column({ type: 'timestamp', default: null })
  end_date: Date;
}
