import { Especialidad } from "./../../models/especialidad";
import { Examen } from "./../../models/examen";
import {
  ExamenesAlumnoAction,
  EXAMENES_ACTION_TYPES,
  ExamenesRequestInProgresAction,
} from "./../types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getExamenes } from "../../services/sysacad-client";

export const ExamenesAlumno = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(requestInProgress(true));
      const response = await getExamenes();
      const especialidadesCount = new Map<string, number>();
      const examenes = response.examenes;

      examenes.forEach((examen) => {
        //Contamos cuantas materias de cada especialidad hay
        especialidadesCount.set(
          examen.especialidad,
          (especialidadesCount.get(examen.especialidad) ?? 0) + 1
        );

        //Marcamos si el examen fue aprobado
        examen.aprobado = examen.calificacionPonderada >= 6;
      });

      //Mapeo el array a una lista de Especialidades
      const especialidades = Array.from(especialidadesCount).map(
        ([nombre, materias]) =>
          ({
            nombre,
            materias,
          } as Especialidad)
      );

      dispatch(
        examenesAlumno(
          response.aprobadas,
          examenes.reverse(),
          especialidades,
          response.promedioConAplazo,
          response.promedioSinAplazo
        )
      );
      dispatch(requestInProgress(false));
    } catch (error) {
      dispatch(requestInProgress(false));
      const errorData =
        error?.response?.data ?? false //Error conocido
          ? {
              status: error.response.data.status,
              message: error.response.data.message,
            }
          : { status: 500, message: "Algo salio mal" };
    }
  };
};

const requestInProgress = (
  inProgress: boolean
): ExamenesRequestInProgresAction => {
  return {
    type: EXAMENES_ACTION_TYPES.EXAMENES_REQUEST_IN_PROGRESS,
    inProgress,
  };
};

const examenesAlumno = (
  aprobados: number,
  examenes: Examen[],
  especialidades: Especialidad[],
  promedioConAplazo: number,
  promedioSinAplazo: number
): ExamenesAlumnoAction => {
  return {
    type: EXAMENES_ACTION_TYPES.EXAMENES_ALUMNO,
    aprobados,
    examenes,
    especialidades,
    promedioConAplazo,
    promedioSinAplazo,
  };
};
