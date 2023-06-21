import { RekognitionClient, CompareFacesCommand } from "@aws-sdk/client-rekognition";
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } from '../config.js'
import fs from 'fs-extra'
import axios from 'axios'

import Paciente from '../models/paciente.model.js'
import Doctor from '../models/doctor.model.js'

const downloadImage = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error al descargar la imagen:', error);
        throw error;
    }
};

const compareFaces = async (fuente, objetivo) => {
    const rekognitionClient = new RekognitionClient({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_KEY,
        },
    });

    const params = {
        SourceImage: {
            "Bytes": fuente
        },
        TargetImage: {
            "Bytes": objetivo
        },
        SimilarityThreshold: 70
    }

    const command = new CompareFacesCommand(params);
    try {
        const data = await rekognitionClient.send(command);
        return data
    } catch (error) {
        console.error('Aqui esta el error al comparar las caras', error)
    } finally {
        console.log('Finalizado')
    }
}
const buscarUsuario = async (usuarioABuscar) => {
    try {
        const paciente = await Paciente.findOne({ usuario: usuarioABuscar });
        const doctor = await Doctor.findOne({ usuario: usuarioABuscar });

        if (!paciente && !doctor) {
            return { error: true, message: 'Usuario no encontrado' };
        }

        return paciente || doctor;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

export const login = async (req, res) => {
    try {
        const usuarioABuscar = req.body.usuario;
        const usuario = await buscarUsuario(usuarioABuscar);

        if (usuario.error) {
            return res.status(404).json({ message: usuario.message });
        }

        let fuente;
        let objetivo;

        if (usuario && req.files?.foto) {
            fuente = await fs.readFile(req.files.foto.tempFilePath);
            objetivo = await downloadImage(usuario?.imagen.secure_url);
        } else {
            return res.status(400).json({ message: 'Usuario no encontrado o falta la foto' });
        }

        const result = await compareFaces(fuente, objetivo);
        console.log(result);
        await fs.unlink(req.files.foto.tempFilePath);

        if (result.FaceMatches[0]?.Similarity) {
            return result.FaceMatches[0].Similarity > 98.00
                ? res.status(200).json(usuario)
                : res.status(200).json({ message: 'Coincidencia baja' });
        }

        return res.status(404).json({ message: 'No hay coincidencia al comparar los rostros' });
    } catch (error) {
        return res.status(500).json({ message: error.message, aqui: 'aqui esta el error en el login' });
    }
};

