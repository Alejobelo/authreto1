import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocumenent } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { IsAvaibleAuthDto } from './dto/is-avaible-dto';
import { transporter } from './mailservice/mailservice';
import { IsEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name)
    private readonly usersModel: Model<UsersDocumenent>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };
    return this.usersModel.create(userObject);
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email } = userObjectLogin;
    const findUser = await this.usersModel.findOne({ email: email });
    if (!findUser) throw new HttpException('USER_NOT:FOUND', 404);

    const checkPassword = await compare(
      userObjectLogin.password,
      findUser.password,
    );
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser._id, name: findUser.name };
    const token = await this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  async isAvaible(userAvaible: IsAvaibleAuthDto) {
    const { email } = userAvaible;
    const userExists = await this.usersModel.findOne({ email: email });
    if (userExists) {
      return { available: false };
    } else {
      return { available: true };
    }
  }
  async recovery(userAvaible: IsAvaibleAuthDto) {
    await transporter.sendMail({
      from: '<arno.mann4@ethereal.email>', // sender address
      to: userAvaible, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
// yhxedmbjbuzmaqdz
