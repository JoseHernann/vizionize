import axios from "axios";


async function analyzeImage(image: File) {
    try {
        // Lee el contenido de la imagen
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(
            'https://vizionizeproyecto-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/5225c0a3-55b1-4d17-b636-d6ba90a94595/detect/iterations/Vizionize/image',
            formData,
            {
                headers: {
                    'Prediction-Key': '045051b658ce4ab9b8d2991f03aae6e8',
                    'Content-Type': 'application/octet-stream'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error llamando a la API de predicción:', error);
        throw error;
    }
}

export default analyzeImage;
