import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import { jwtConstants } from "./jwt-token.constants";

@Injectable()
export class JwtTokenService {

    constructor(private jwtService: JwtService) {}

    async generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '30d', secret: jwtConstants.refreshSecret})
        return {
            accessToken,
            refreshToken
        }
    }

    async validateAccessToken(accessToken) {
        return this.jwtService.verify(accessToken, {secret: jwtConstants.accessSecret})
    }

    async validateRefreshToken(refreshToken) {
        return this.jwtService.verify(refreshToken, {secret: jwtConstants.refreshSecret})
    }

}
