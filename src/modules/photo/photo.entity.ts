import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'photo' })
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => UsersEntity,
    user => user.photos,
  )
  user: UsersEntity;

  @Column({ type: 'varchar' })
  url: string;
}
