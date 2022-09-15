// react
import { View, Image, FlatList } from "react-native";

// components
import { Heading } from "../../components/Heading/index";
import { GameCard } from "../../components/GameCard/index";

// utils
import { GAMES } from "../../utils/games";

// styles
import { styles } from "./styles";
// assets
import logoImg from "../../assets/logo-nlw-esports.png";

export function Home() {
    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Heading title="Find your duo!" subtitle="Select the game you wanna play..." />

            <FlatList
                contentContainerStyle={styles.contentList}
                data={GAMES}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <GameCard
                        data={item}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
            />

        </View>
    );
}