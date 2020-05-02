import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesController } from './mensajes/mensajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeService } from './mensaje/mensaje.service';
import { Mensaje } from './mensajes/entities/mensaje.entity';
@Module({
  imports: [

      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'nest',
        password: 'root',
        database: 'minitwitter',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),

      TypeOrmModule.forFeature([Mensaje])
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajeService],
})
export class AppModule {}
