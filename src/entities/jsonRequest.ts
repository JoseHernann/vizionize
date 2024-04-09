type JsonRequestOptions = {
  process?: string;
  encryptedSP?: string;
  dataString?: string;
  paramValues?: Array<paramValues>;
  User?: string;
  Pass?: string;
  encryptedConnection?: string;
};

type paramValues = {
  name: string;
  type: string;
  value: string;
};
export default JsonRequestOptions;
