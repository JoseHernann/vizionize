import instance from './axiosInstance';
import JsonRequestOptions from '../entities/jsonRequest.ts';

async function getDinamicData(requestOptions: JsonRequestOptions) {
  const {
    process = 'WebAPI_GetDinamicData',
    encryptedSP,
    paramValues = [],
    dataString,
    User,
    Pass,
    encryptedConnection = 'X_X3ypK/d6yBFmsjtdhBmONhA==', //Vizionize
  } = requestOptions;

  const response = await instance.post('DinamicData/GetDinamicData', {
    process,
    dataString,
    encryptedSP, //
    encryptedConnection,
    paramValues, //
    User,
    Pass,
  });
  return JSON.parse(response.data);
}

export default getDinamicData;
