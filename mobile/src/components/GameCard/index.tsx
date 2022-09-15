// react
import { Text, ImageBackground, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps } from "react-native";

// styles
import { styles } from "./styles";
import { THEME } from "../../theme";
// expo
import { LinearGradient } from "expo-linear-gradient";

export interface GameCardProps {
    id: string;
    name: string;
    ads: string;
    cover: ImageSourcePropType;
}
interface Props extends TouchableOpacityProps {
    data: GameCardProps;
}
export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground
                style={styles.cover}
                source={data.cover}
            >
                <LinearGradient
                    colors={THEME.COLORS.FOOTER}
                    style={styles.footer}
                >
                    <Text style={styles.name}>
                        {data.name}
                    </Text>
                    <Text style={styles.ads}>
                        {data.ads} ads
                    </Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}