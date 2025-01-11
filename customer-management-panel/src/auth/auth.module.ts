import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { JwtStrategy } from './stratergies/jwt.stratergy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtUserMiddleware } from 'src/middleware/jwt-user.middlware';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: '7d' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtUserMiddleware)
            .forRoutes('*'); // Apply to all routes, or specify specific routes
    }
}