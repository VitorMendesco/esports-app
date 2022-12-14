// react
import { View, ActivityIndicator } from "react-native";

// styles
import { styles } from "./styles";
import { THEME } from "../../theme";

export function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={THEME.COLORS.PRIMARY} />
        </View>
    );
};
