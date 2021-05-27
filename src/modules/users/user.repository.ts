import { genSalt, hash } from 'bcryptjs';
import { Repository, EntityRepository } from 'typeorm';
import { SignupDto } from '../auth/dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signup(signupDto: SignupDto) {
        const { name, email, password } = signupDto;
        const user = new User();
        user.name = name;
        user.email = email;
        const salt = await genSalt(10);
        user.password = await hash(password, salt);
        await user.save();
    }
}
