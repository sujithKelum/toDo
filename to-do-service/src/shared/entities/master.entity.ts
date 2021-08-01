import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class MasterEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', name: 'created_at', default: null })
  created_at: Date;

  @Column({ type: 'timestamp', name: 'updated_at', default: null })
  updated_at: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', default: null })
  deleted_at: Date;
}
