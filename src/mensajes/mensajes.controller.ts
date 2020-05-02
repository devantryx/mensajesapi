import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajeService } from 'src/mensaje/mensaje.service';
import { response } from 'express';

@Controller('mensajes')
export class MensajesController {
    constructor(private mensajesServices: MensajeService){

    }

    @Post()
    create (@Body() createMensajeDto: CreateMensajeDto, @Res() response){
        //then = devuelve respuesta si no hay error 
        this.mensajesServices.createMensaje(createMensajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }
        // catch = si hay error lo captura         
        ).catch(() =>{
            
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la creacion del mensaje'});

        }); 
        
    }

        @Get()
        getAll(@Res() response){
           this.mensajesServices.getAll().then(mensajesList =>{

            response.status(HttpStatus.OK).json(mensajesList);

           } ).catch(()=>{

            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtencion del mensajes'});
           });
        }

        //actualizar mensaje que ya existe

        @Put(':id')
        update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
            this.mensajesServices.updateMensaje(idMensaje, updateMensajeDto).then(mensaje =>{

                   response.status(HttpStatus.OK).json(mensaje); 

            }).catch(()=> {

                response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la ediciòn del mensajes'});

            });

        }

        @Delete(':id')
        delete(@Res() response, @Param('id') idMensaje){
               this.mensajesServices.deleteMensaje(idMensaje).then(res =>{

                response.status(HttpStatus.OK).json(res);
               }).catch(()=>{
                response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la eliminaciòn del mensajes'});
               }); 
        }
}
