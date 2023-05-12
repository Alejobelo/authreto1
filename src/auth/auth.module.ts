import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from 'src/users/schema/users.schema';


@Module({

  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
