import { Repository, EntityRepository } from 'typeorm';
import { Domain } from './domain.entity';

@EntityRepository(Domain)
export class DomainRepository extends Repository<Domain> {}
