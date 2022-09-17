// react
import { TouchableOpacity, View, Text } from "react-native";
import { DuoInfo } from "../DuoInfo";

// styles
import { styles } from "./styles";
import { THEME } from "../../theme";
import { GameController } from "phosphor-react-native";

export interface DuoCardProps {
    idAd: string;
    name: string;
    weekDays: string[];
    useVoiceChannel: boolean;
    yearsPlaying: number;
    hoursStart: string;
    hoursEnd: string;
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}
export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label="Name"
                value={data.name}
            />
            <DuoInfo
                label="Game time"
                value={`${data.yearsPlaying} years`}
            />
            <DuoInfo
                label="Time availability"
                value={`${data.weekDays.length} days \u2022 ${data.hoursStart} - ${data.hoursEnd}`}
            />
            <DuoInfo
                label="Voice Channel"
                value={data.useVoiceChannel ? "Yes" : "No"}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={onConnect}
            >
                <GameController color={THEME.COLORS.TEXT} size={20} />
                <Text style={styles.buttonTitle}>Connect</Text>
            </TouchableOpacity>
        </View>
    );
}