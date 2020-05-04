import { Examen } from "./examen";

export type Examenes = {
    aprobadas: number,
    promedioConAplazo: number,
    promedioSinAplazo: number,
    examenes: Examen[],
}