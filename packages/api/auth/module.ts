import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'

import { AuthController } from './controller'
import { JwtStrategy } from './jwt/strategy'
import { AuthService } from './service'

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    CqrsModule,
    registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

function registerAsync(arg0: { imports: (typeof ConfigModule)[]; inject: (typeof ConfigService)[]; useFactory: () => { secret: string; signOptions: { expiresIn: string } } }): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error('Function not implemented.')
}
