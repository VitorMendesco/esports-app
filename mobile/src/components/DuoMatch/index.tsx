// react
import { useState } from "react";
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Clipboard from "expo-clipboard";

// components
import { Heading } from "../Heading";

// styles
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { THEME } from "../../theme";

interface Props extends ModalProps {
    discord: string,
    onClose: () => void,
}
export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [isCopping, setIsCopping] = useState(false);
    async function handleCopyDiscord() {
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord copied!', 'User copied to paste at Discord');
        setIsCopping(false);
    }

    return (
        <Modal
            {...rest}
            transparent
            statusBarTranslucent
            animationType="fade"
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>
                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />

                    <Heading
                        title="Let's Play"
                        subtitle="Now just start playing!"
                        style={{ alignItems: "center", marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Add to Discord
                    </Text>

                    <TouchableOpacity 
                    style={styles.discordButton} 
                    onPress={handleCopyDiscord}
                    disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}