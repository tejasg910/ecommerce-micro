import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
        // Debug log
        console.log('JWT Secret:', process.env.JWT_SECRET);
    }

    async validate(payload: any) {
        try {
            console.log('Validating payload:', payload);
            if (!payload) {
                throw new UnauthorizedException('Invalid token payload');
            }
            return payload;
        } catch (error) {
            console.error('Validation error:', error);
            throw error;
        }
    }
}