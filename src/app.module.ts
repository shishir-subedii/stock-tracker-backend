
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AppConfigModule } from './common/config/config.module';
import { DatabaseModule } from './database/database.module';
import { JwtmoduleModule } from './common/jwtmodule/jwtmodule.module';
import { ProductModule } from './product/product.module';
import { CompanyModule } from './company/company.module';
import { PublicApiModule } from './public-api/public-api.module';

@Module({
  imports: [
    DatabaseModule, UsersModule, AuthModule, AppConfigModule, JwtmoduleModule, ProductModule, CompanyModule, PublicApiModule
  ],
  providers: [],
})
export class AppModule { }
