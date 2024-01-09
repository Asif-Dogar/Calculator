import { useContext } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";



export default function Button({ title, onPress, isBlue, isGray }) {
    const theme = useContext(ThemeContext);

    return (
        <View>
            {title == '=' ?
                <TouchableOpacity
                    style={Styles.equalbutton}
                    onPress={onPress}
                >
                    <Text
                        style={
                            isBlue || isGray
                                ? Styles.smallTextLight
                                : theme === "dark"
                                    ? Styles.smallTextLight
                                    : Styles.smallTextDark
                        }
                    >
                        {title}
                    </Text>
                </TouchableOpacity> : <TouchableOpacity
                    style={
                        isBlue
                            ? Styles.btnBlue
                            : isGray
                                ? Styles.btnGray
                                : theme === "light"
                                    ? Styles.btnLight
                                    : Styles.btnDark

                    }
                    onPress={onPress}>
                    <Text
                        style={
                            isBlue || isGray
                                ? Styles.smallTextLight
                                : theme === "dark"
                                    ? Styles.smallTextLight
                                    : Styles.smallTextDark
                        }
                    >
                        {title}
                    </Text>
                </TouchableOpacity>
            }

        </View>
    );
}
