import {
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TreatmentSection from "../../../components/treatmentComponents/TreatmentSection";

export function TreatmentPage() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TreatmentSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
