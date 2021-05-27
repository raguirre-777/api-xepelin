import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './modules/users/user.entity';
import { Domain } from './modules/domains/domain.entity';
import { UserRepository } from './modules/users/user.repository';
import { DomainRepository } from './modules/domains/domain.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SigninDto, SignupDto } from './modules/auth/dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(DomainRepository)
    private readonly _domainRepository: DomainRepository,
    private readonly _jwtService: JwtService,
  ) { }
 
  async shorten(domain: Domain): Promise<Domain> {
    const savedShorten: Domain = await this._domainRepository.save(domain);
    return domain;
  }

  async get(id: any): Promise<Domain> {
     const domain : Domain = await this._domainRepository.findOne({
      where: { id },
     });
    return domain;
  }

  async getDomain(): Promise<Domain[]> {
    const domain : Domain[] = await this._domainRepository.find();
    return domain;
  }


  async register(signupDto: SignupDto): Promise<void> { //registrar
        const { name, email } = signupDto;
        const userExists = await this._userRepository.findOne({
            where: [{ name }, { email }],
        });

        if (userExists) {
            throw new ConflictException('name o email existe');
        }

        return this._userRepository.signup(signupDto);
 }

    async login(signinDto: SigninDto): Promise<{ token: string }> {
        const { name, password } = signinDto;

        const user: User = await this._userRepository.findOne({
            where: { name },
        });

        if (!user) {
            throw new NotFoundException('usuario no existe');
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('credentiales invalidas');
        }
        const payload: any = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        const token = await this._jwtService.sign(payload);
        console.log(token);
        if (!token) {
            throw new UnauthorizedException('no se logra generar token');
        }

        return { token };
    }



}
