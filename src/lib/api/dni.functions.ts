import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import process from "node:process";

export const lookupDni = createServerFn({ method: "GET" })
  .inputValidator(z.object({ dni: z.string().length(8) }))
  .handler(async ({ data }) => {
    const { dni } = data;

    // 1. Base de datos de simulación local (Mock) para pruebas
    const mocks: Record<string, string> = {
      "12345678": "JUAN CARLOS PEREZ RODRIGUEZ",
      "87654321": "MARIA ELENA GOMEZ SANCHEZ",
      "11111111": "NICOLAS ALEJANDRO DE LA CRUZ",
      "99999999": "NICOLE FLY DEVELOPER",
    };

    if (mocks[dni]) {
      return { success: true, name: mocks[dni], source: "mock" };
    }

    // 2. Intentar consultar apis.net.pe
    const token = process.env.APIS_TOKEN;
    if (!token) {
      // Si no hay token configurado, simulamos un nombre realista basado en el DNI
      const firstNames = ["Juan", "Maria", "Jose", "Ana", "Luis", "Carlos", "Rosa", "Pedro", "Jorge", "Sofia"];
      const lastNames = ["Quispe", "Flores", "Sanchez", "Garcia", "Rodriguez", "Rojas", "Huaman", "Mamani", "Diaz", "Vasquez"];
      
      const seed1 = parseInt(dni.substring(0, 4)) || 0;
      const seed2 = parseInt(dni.substring(4, 8)) || 0;
      
      const name = `${firstNames[seed1 % firstNames.length]} ${firstNames[(seed1 + 3) % firstNames.length]} ${lastNames[seed2 % lastNames.length]} ${lastNames[(seed2 + 7) % lastNames.length]}`.toUpperCase();

      return { 
        success: true, 
        name, 
        source: "simulation",
        note: "Configure APIS_TOKEN en su archivo .env para consultas reales"
      };
    }

    try {
      const response = await fetch(`https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API status ${response.status}`);
      }

      const resData = await response.json();
      if (resData && resData.nombres) {
        const fullName = `${resData.nombres} ${resData.apellidoPaterno || ""} ${resData.apellidoMaterno || ""}`.trim().toUpperCase();
        return { success: true, name: fullName, source: "apis.net.pe" };
      }

      return { success: false, error: "No se encontró información para este DNI" };
    } catch (error: any) {
      console.error("Error al consultar DNI en apis.net.pe:", error);
      return { success: false, error: "Error al consultar la base de datos de RENIEC" };
    }
  });
