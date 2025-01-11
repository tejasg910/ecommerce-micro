import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from '../config/env';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async login(email: string, password: string): Promise<string> {
        if (email !== env.email || password !== env.password) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const payload = { email };
        return this.jwtService.sign(payload);
    }

    async verify(token: string): Promise<boolean> {
        try {
            // Remove 'Bearer ' if present
            const tokenValue = token?.startsWith('Bearer ')
                ? token.slice(7)
                : token;

            if (!tokenValue) {
                return false;
            }

            const decoded = await this.jwtService.verify(tokenValue);
            return !!decoded;
        } catch (error) {
            return false;
        }
    }
}