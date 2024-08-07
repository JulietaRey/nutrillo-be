import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AwsCognitoService } from './aws-cognito.service';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';
import { JwtStrategy } from './jwt.strategy';
import { InviteService } from '../invite/invite.service';
import { InviteModule } from '../invite/invite.module';

@Module({
  providers: [AwsCognitoService, JwtStrategy],
  controllers: [AuthController],
  imports: [PassportModule, UserModule, AdminModule, InviteModule],
  exports: [AwsCognitoService],
})
export class AuthModule {}
