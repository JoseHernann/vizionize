type itemEspecification = {
  name: string;
  stock: number;
  precioUnit: number;
  precioVent: number;
  proveedor: proveedorType;
  category: categoryType;
  image: string;
};

type categoryType = {
    category: string;
    ID_CATEGORIA: number;
}

type proveedorType = {
  proveedor: string;
  ID_PROVEEDOR: number;
}
export default itemEspecification;
