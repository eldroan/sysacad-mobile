import {
  ExamenesAction,
  ExamenesState,
  EXAMENES_ACTION_TYPES,
  ExamenesAlumnoAction,
  ExamenesRequestInProgresAction,
} from "./../types";

const initialState: ExamenesState = {
  examenes: [],
  especialidades: [],
  aprobados: 0,
  promedioConAplazo: 0,
  promedioSinAplazo: 0,
  requestInProgress: false,
};

export const examenesSlice = (
  state: ExamenesState = initialState,
  action: ExamenesAction
): ExamenesState => {
  switch (action.type) {
    case EXAMENES_ACTION_TYPES.EXAMENES_ALUMNO:
      const {
        aprobados,
        examenes,
        especialidades,
        promedioConAplazo,
        promedioSinAplazo,
      } = action as ExamenesAlumnoAction;
      return {
        ...state,
        aprobados,
        examenes,
        especialidades,
        promedioConAplazo,
        promedioSinAplazo,
      };
    case EXAMENES_ACTION_TYPES.EXAMENES_REQUEST_IN_PROGRESS:
      return {
        ...state,
        requestInProgress: (action as ExamenesRequestInProgresAction)
          .inProgress,
      };
    default:
      return state;
  }
};
