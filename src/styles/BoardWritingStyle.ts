import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  fieldContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  labelInput: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  valueInput: {
    fontSize: 16,
    color: "#000",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#006994",
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default styles;
