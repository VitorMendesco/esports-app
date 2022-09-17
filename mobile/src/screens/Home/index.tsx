// react
import { useState, useEffect } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// components
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading/index";
import { GameCard, GameCardProps } from "../../components/GameCard/index";

// utils

// styles
import { styles } from "./styles";
// assets
import logoImg from "../../assets/logo-nlw-esports.png";

export function Home() {
    const navigation = useNavigation();
    function handleOpenGame({ idGame, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { idGame, title, bannerUrl });
    }

    const [games, setGames] = useState<GameCardProps[]>([]);
    useEffect(() => {
        fetch('http://192.168.226.211:3333/games')
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.log(err))
    }, []);

    return (
        <Background>

            <SafeAreaView style={styles.container}>
                <Image source={logoImg} style={styles.logo} />
                <Heading title="Find your duo!" subtitle="Select the game you wanna play..." />

                <FlatList
                    contentContainerStyle={styles.contentList}
                    data={games}
                    keyExtractor={item => item.idGame}
                    renderItem={({ item }) => (
                        <GameCard
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />

            </SafeAreaView>
        </Background>
    );
}