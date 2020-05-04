import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ListRenderItem,
  ListRenderItemInfo,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  Text,
  Button,
  Layout,
  List,
  ListItem,
  Icon,
  Toggle,
} from "@ui-kitten/components";
import {
  SafeAreaLayoutElement,
  SafeAreaLayout,
  SaveAreaInset,
} from "../components/safe-are-layout.component";
import { DefaultProps } from "../navigation/app.navigator";
import { padding } from "../assets/uispec";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../redux/types";
import {
  TinyHorizontalSpacer,
  SmallHorizontalSpacer,
  SmallVerticalSpacer,
  MediumVerticalSpacer,
} from "../components/spacers.component";
import { ExamenesAlumno } from "../redux/examenes/actions";
import { Examen } from "../models/examen";
import { Especialidad } from "../models/especialidad";
import { ScrollView } from "react-native-gesture-handler";

export const HomeScreen = ({
  navigation,
}: DefaultProps): SafeAreaLayoutElement => {
  const goBack = () => {
    navigation.pop();
  };
  const [requestExamenes, setRequestExamenes] = useState(true);
  const [onlyShowAprobadas, setOnlyShowAprobadas] = useState(false);
  const nombre = useSelector(
    (state: ApplicationState) => state.auth.alumno?.nombre ?? ""
  );

  const {
    examenes,
    especialidades,
    aprobados,
    promedioConAplazo,
    promedioSinAplazo,
    requestInProgress,
  } = useSelector((state: ApplicationState) => state.examenes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (requestExamenes) {
      dispatch(ExamenesAlumno());
      setRequestExamenes(false);
    }
  }, [requestExamenes]);
  const isVisible = (e: Examen): boolean =>
    !onlyShowAprobadas || (onlyShowAprobadas && e.aprobado);
  return (
    <Layout level="1" style={styles.container}>
      <SafeAreaLayout style={styles.header} insets={SaveAreaInset.TOP}>
        <Text category="h1">INFORMACIÓN</Text>
      </SafeAreaLayout>

      {/* Por alguna extraña razon no funciona bien List en web*/}
      {Platform.OS == "web" ? (
        <Layout level='2' style={{flex:1}}>
          <ScrollView>
            <ExamenListHeader
              especialidades={especialidades}
              nombre={nombre}
              aprobadas={aprobados}
              totales={examenes.length}
              promedioConAplazo={promedioConAplazo}
              promedioSinAplazo={promedioSinAplazo}
              requestInProgress={requestInProgress}
              checked={onlyShowAprobadas}
              setChecked={setOnlyShowAprobadas}
            />
            {examenes.map((e) => (
              <ExamenCard examen={e} visible={isVisible(e)} />
            ))}
          </ScrollView>
        </Layout>
      ) : (
        <List
          data={examenes}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ExamenListHeader
              especialidades={especialidades}
              nombre={nombre}
              aprobadas={aprobados}
              totales={examenes.length}
              promedioConAplazo={promedioConAplazo}
              promedioSinAplazo={promedioSinAplazo}
              requestInProgress={requestInProgress}
              checked={onlyShowAprobadas}
              setChecked={setOnlyShowAprobadas}
            />
          )}
          renderItem={(e: ListRenderItemInfo<Examen>) => (
            <ExamenCard examen={e.item} visible={isVisible(e.item)} />
          )}
        />
      )}
    </Layout>

    // </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: padding.medium,
    paddingTop: padding.large,
    paddingBottom: padding.tiny,
  },
  container: { flex: 1 },
  headerTextStyle: { textTransform: "uppercase" },
});

const ExamenCard = ({
  examen,
  visible,
}: {
  examen: Examen;
  visible?: boolean;
}): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingHorizontal: padding.small,
    },
    accessory: { flexDirection: "column" },
    gradeText: { fontWeight: "bold", textAlign: "center" },
  });
  const checkIcon = (style: any) => (
    <Icon {...style} fill={"#00E09699"} name="checkmark-circle-2-outline" />
  );
  const crossIcon = (style: any) => (
    <Icon {...style} fill={"#FFAA0099"} name="close-circle-outline" />
  );
  visible = visible ?? true;
  return visible ? (
    <ListItem
      style={styles.container}
      title={examen.materia}
      key={examen.codigo}
      description={`Plan: ${examen.plan} | Especialidad: ${examen.especialidad}`}
      icon={examen.aprobado || examen.calificacion == 0 ? checkIcon : crossIcon}
      accessory={() => (
        <View style={styles.accessory}>
          <Text style={styles.gradeText}>
            {examen.calificacionPonderada !== 0
              ? examen.calificacionPonderada.toFixed(2)
              : "-"}
          </Text>
          <Text category="c1" appearance="hint">
            {examen.fecha}
          </Text>
        </View>
      )}
    />
  ) : (
    <></>
  );
};

const ExamenListHeader = ({
  especialidades,
  nombre,
  aprobadas,
  totales,
  promedioConAplazo,
  promedioSinAplazo,
  requestInProgress,
  checked,
  setChecked,
}: {
  especialidades: Especialidad[];
  nombre: string;
  aprobadas: number;
  totales: number;
  promedioConAplazo: number;
  promedioSinAplazo: number;
  requestInProgress: boolean;
  checked: boolean;
  setChecked: (value: boolean) => void;
}): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    nameText: { marginHorizontal: padding.medium, textTransform: "uppercase" },
    infoText: { marginHorizontal: padding.medium, textAlign: "justify" },
    materiasCountText: {
      marginHorizontal: padding.medium,
      textAlign: "justify",
      marginTop: -padding.small,
      marginBottom: padding.tiny,
    },
    toggle: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      marginLeft: padding.medium,
      marginRight: padding.medium,
      marginBottom: padding.small,
    },
    toggleTextStyle: { marginHorizontal: 0 },
    promedioContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: padding.medium,
      paddingTop: padding.tiny,
    },
    promedioText: { textAlign: "center" },
    promedioCardContainer: {
      padding: padding.small,
      borderRadius: padding.tiny,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <TinyHorizontalSpacer />
      <Text style={styles.nameText} appearance="hint">
        ALUMNO
      </Text>

      {/* NOMBRE DEL ALUMNO */}
      <Text category="h5" style={styles.nameText}>
        {nombre}
      </Text>
      <SmallHorizontalSpacer />

      {/* PROMEDIO */}
      <Text style={styles.nameText} appearance="hint">
        PROMEDIO
      </Text>
      <View style={styles.promedioContainer}>
        <Layout style={styles.promedioCardContainer}>
          {requestInProgress ? (
            <ActivityIndicator />
          ) : (
            <Text category="h5" style={styles.promedioText}>
              {promedioSinAplazo.toFixed(2)}
            </Text>
          )}
          <Text category="c1" appearance="hint" style={styles.promedioText}>
            SIN APLAZO
          </Text>
        </Layout>
        <MediumVerticalSpacer />
        <Layout style={styles.promedioCardContainer}>
          {requestInProgress ? (
            <ActivityIndicator />
          ) : (
            <Text category="h5" style={styles.promedioText}>
              {promedioConAplazo.toFixed(2)}
            </Text>
          )}
          <Text category="c1" appearance="hint" style={styles.promedioText}>
            CON APLAZO
          </Text>
        </Layout>
      </View>
      <SmallHorizontalSpacer />

      <Text style={styles.nameText} appearance="hint">
        MATERIAS
      </Text>
      <TinyHorizontalSpacer />

      {/* MENSAJE INFORMATIVO */}
      <Text category="c1" appearance="hint" style={styles.infoText}>
        Las notas previas al 27 octubre 2016 (inclusive) se muestran ponderadas
        de acuerdo a ordenanza № 1566.
      </Text>
      <TinyHorizontalSpacer />

      {/* TOGGLE PARA FILTRAR SOLO MATERIAS APROBADAS */}
      {aprobadas > 0 && (
        <>
          <Toggle
            style={styles.toggle}
            textStyle={styles.toggleTextStyle}
            text="Ver solo materias aprobadas"
            checked={checked}
            status="control"
            onChange={(isChecked) => {
              setChecked(isChecked);
            }}
          />
          <Text
            category="c1"
            appearance="hint"
            style={styles.materiasCountText}
          >
            {`Cantidad de materias: ${checked ? aprobadas : totales}`}
          </Text>
        </>
      )}

      {/* SPINNER QUE SE MUESTRA CUANDO SE ESTAN PIDIENDO LOS DATOS */}
      {requestInProgress && (
        <Layout level="2">
          <SmallHorizontalSpacer />
          <ActivityIndicator size="large" />
          <Text category="c1" appearance="hint" style={{ textAlign: "center" }}>
            Cargando materias...
          </Text>
        </Layout>
      )}
    </View>
  );
};
