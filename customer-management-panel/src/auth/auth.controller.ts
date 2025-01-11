import { Controller, Post, Body, UseGuards, Put, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/auth.guards';
import { UpdateProfileDto } from './dto/update-profile';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }


    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {

        console.log(req.user, "this is req.user")
        return this.authService.updateProfile(req.user.userId, updateProfileDto);
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getUserDetails(@Request() req) {
        return this.authService.getUserDetails(req.user.userId);
    }
}