// react
import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native"
import { GameParams } from "../../@types/navigation";

// components
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

// styles
import logoImg from "../../assets/logo-nlw-esports.png"
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Entypo } from "@expo/vector-icons";

export function Game() {
    // handling navigation with go back btn
    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    }

    // getting route params 
    const route = useRoute();
    const game = route.params as GameParams;

    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    useEffect(() => {
        fetch(`http://192.168.226.211:3333/games/${game.idGame}/ads`)
            .then(res => res.json())
            .then(data => setDuos(data))
            .catch(err => console.log(err))
    }, []);

    // modal discord
    const [discordDuo, setDiscordDuo] = useState('');
    async function getDiscord(idAd: string) {
        fetch(`http://192.168.226.211:3333/ads/${idAd}/discord`)
            .then(res => res.json())
            .then(data => setDiscordDuo(data.discord))
            .catch(err => console.log(err))
    }
    
    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />
                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Connect and start playing!"
                />
                <FlatList
                    data={duos}
                    keyExtractor={item => item.idAd}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onConnect={() => getDiscord(item.idAd)}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            There is no ads for this game :(
                        </Text>
                    )}
                />
                <DuoMatch
                    visible={discordDuo.length > 0}
                    onClose={() => setDiscordDuo('')}
                    discord={discordDuo}
                />
            </SafeAreaView>
        </Background>
    );
}