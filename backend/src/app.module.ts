import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectionsModule } from './directions/directions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
    AuthModule,
    UsersModule,
    UploadModule,
    DirectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
