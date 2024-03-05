import instance from './axiosInstance';
import JsonRequestOptions from '../entities/JSONRequest';

async function getDinamicData(requestOptions: JsonRequestOptions) {
  const {
    process = 'WebAPI_GetDinamicData',
    encryptedSP,
    paramValues,
    User,
    Pass,
    encryptedConnection = '', // En caso que solo se vaya a trabajar una sola conexion se puede modificar esta linea y colocar la conexion como una constante
  } = requestOptions;

  const response = await instance.post('DinamicData/GetDinamicData', {
    process,
    dataString: '',
    encryptedSP,
    encryptedConnection,
    paramValues,
    User,
    Pass,
  });

  return JSON.parse(response.data);
}

export default getDinamicData;
