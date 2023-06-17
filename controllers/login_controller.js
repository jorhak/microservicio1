import { RekognitionClient, CompareFacesCommand } from "@aws-sdk/client-rekognition";
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } from '../config.js'
import fs from 'fs-extra'
import axios from 'axios'

import Paciente from '../models/paciente.model.js'

const downloadImage = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error al descargar la imagen:', error);
        throw error;
    }
};

const pacienteUsuario = async (usuarioABuscar) => {
    try {
        const paciente = await Paciente.findOne({ usuario: usuarioABuscar })
        if (!paciente) return res.status(404).json({ message: 'Usuario no encontrado' })

        return paciente?.imagen.secure_url
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

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

export const login = async (req, res) => {
    try {
        let fuente
        let objetivo
        const usuarioABuscar = req.body.usuario
        const paciente = await pacienteUsuario(usuarioABuscar)

        if (paciente && req.files?.foto) {
            fuente = await fs.readFile(req.files.foto.tempFilePath)
            objetivo = await downloadImage(paciente)
        }

        const result = await compareFaces(fuente, objetivo)
        console.log(result)
        await fs.unlink(req.files.foto.tempFilePath)
        if (result.FaceMatches[0]?.Similarity) {
            return result.FaceMatches[0].Similarity > 98.00 ? res.status(200).json({ message: 'true' }) : res.status(200).json({ message: 'Coincidencia baja' })
        } else {
            return res.status(404).json({ message: 'No hay coinciendecia al comparar los rostros' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message, aqui: 'aqui esta el errors en el login' })
    }
}

