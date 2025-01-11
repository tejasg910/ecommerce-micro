import { Controller, Post, Body, Headers, Get, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

// First create a DTO for login validation
export class LoginDto {
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() { email, password }: LoginDto) {
        try {
            const token = await this.authService.login(email, password);
            return {
                success: true,
                data: { token },
                message: 'Login successful'
            };
        } catch (error) {

            if (error instanceof HttpException) {
                const status = error.getStatus();
                throw new HttpException(error.message, status);
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }


        }
    }

    @Get('verify')
    async verifyToken(@Headers('authorization') authorization: string) {
        const isValid = await this.authService.verify(authorization);

        if (!isValid) {
            throw new UnauthorizedException('Token is not valid');
        }

        return {
            success: true,
            data: { valid: true },
            message: 'Valid token'
        };
    }
}