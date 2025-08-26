// src/path/to/user.repository.ts

import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {}

// I don't used it now but sometimes it may be needed
