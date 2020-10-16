import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import { Request, Response } from 'express';

export default {


    async index(request:Request, response:Response){
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find(); // listando todos os orfanatos

        return response.json(orphanages);
    },
    
    async show(request:Request, response:Response){
        const { id } = request.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id); // listando todos os orfanatos

        return response.json(orphanage);
    },

    async create(request: Request, response: Response) {

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;

        try {
            const orphanageRepository = getRepository(Orphanage);

            const requestImages = request.files as Express.Multer.File[];
            //instruindo para o codigo que o requestImages é um array de arquivos
            const images = requestImages.map(image => {
                return { path: image.filename }
            })


            const orphanage = orphanageRepository.create(
                {
                    name,
                    latitude,
                    longitude,
                    about,
                    instructions,
                    opening_hours,
                    open_on_weekends,
                    images

                }
            ); // cria um repositorio com dados do usuário

            await orphanageRepository.save(orphanage);
            response.status(201).json(orphanage);

        } catch (err) {
            response.send(err)
        }


    }
};