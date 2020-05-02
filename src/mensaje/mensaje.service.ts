import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from 'src/mensajes/entities/mensaje.entity';
import { CreateMensajeDto } from 'src/mensajes/dto/create-mensaje-dto';

@Injectable()
export class MensajeService {
    constructor(
        @InjectRepository(Mensaje)
        private MensajeRepository: Repository<Mensaje>,
      ) {}

        //metodo para obtener toda la lista de notas
      async  getAll(): Promise<Mensaje[]>{
            return await this.MensajeRepository.find(); 
        }

        async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje>{
             const nuevo = new Mensaje();
             nuevo.mensaje = mensajeNuevo.mensaje;
             nuevo.nick = mensajeNuevo.nick;   

             //invoca al repositorio
             return this.MensajeRepository.save(nuevo);
        }

        //metodo para actualizar
        async updateMensaje(idMensaje:number,mensajeActualizar:CreateMensajeDto): Promise<Mensaje>{
            const mensajeUpdate = await this.MensajeRepository.findOne(idMensaje);
            mensajeUpdate.nick = mensajeActualizar.nick;
            mensajeUpdate.mensaje = mensajeActualizar.mensaje;

            return await this.MensajeRepository.save(mensajeUpdate);
        }

        //metodo para eliminar
        async deleteMensaje(idMensaje:number): Promise<any>{
            return await this.MensajeRepository.delete(idMensaje);

        }

}
