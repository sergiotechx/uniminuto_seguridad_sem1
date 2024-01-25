import { NextResponse } from "next/server";
import Cryptr from 'cryptr';
//Frase semilla protejida variable de entorno
const { SECRET_KEY } = process.env;
//Clave encriptada
const encrypetPass = 'f1d7763ff25e8fec5105422f06edeb8b1572a644a1fabcc5ae3f7d42f37a3673ecf1bfb1e8d9d8d09f736157cd81ab9e83fe81d71719f28e3e9781c8edc18de683be2bd85e786bfbeef31da10fe00350c0776582cacc66d4571d52bc6c33bb8c1200eae892c169a182cb849ea3ff';
export const POST = async (request: Request) => {

  try {
    const cryptr = new Cryptr(SECRET_KEY as string);
    const { user, password } = await request.json();
    //Si la clave es la indicada se hace el proceso exitos de sesión   
    if (user == 'uniminuto' && password == cryptr.decrypt(encrypetPass)) {
      return NextResponse.json({ data: 'logueo exitoso' }, { status: 200 })
    }
    else { return NextResponse.json({ data: 'credenciales erroneas' }, { status: 500 }) }


  } catch (error) {
    return NextResponse.json({ data: 'Error en la sesion' }, { status: 500 })
  }

}