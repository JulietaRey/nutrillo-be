import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AwsCognitoService } from 'src/auth/aws-cognito.service';
import { adminProviders } from './admin.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AdminController],
  providers: [...adminProviders, AdminService, AwsCognitoService],
  exports: [AdminService],
})
export class AdminModule {}
