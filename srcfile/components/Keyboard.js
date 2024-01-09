import Button from "./Button";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import { View, Text, Vibration } from "react-native";
import { useState } from "react";



export default function MyKeyboard() {
    const math = require('mathjs');
    const [currentNumber, setCurrentNumber] = useState('');
    const [lastNumber, setLastNumber] = useState('');
    const [lastButton, setLastButton] = useState('');

    const buttons = ['C', '%', '⌫', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '.', 0, '=']

    function isOperator(button) {
        return '+-*/%'.includes(button);
    }

    function isDigitOrDot(button) {
        return '1234567890.'.includes(button);
    }

    function handleInput(buttonPressed) {

        Vibration.vibrate(35);

        if (buttonPressed === '⌫') {
            setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        } else if (buttonPressed === 'C') {
            setLastNumber('');
            setCurrentNumber('');
        } else if (buttonPressed === '=') {
            setLastNumber(currentNumber + '=');
            calculator();
        } else if (isOperator(buttonPressed) && !isOperator(lastButton)) {
            setCurrentNumber(currentNumber + buttonPressed);
        } else if (isDigitOrDot(buttonPressed)) {
            setCurrentNumber(currentNumber + buttonPressed);
        }

        setLastButton(buttonPressed);
    }


    function calculator() {

        let lastArr = currentNumber[currentNumber.length - 1];

        if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
            const modifiedExpression = currentNumber.slice(0, -1);
            setCurrentNumber(modifiedExpression)
            let result = math.evaluate(modifiedExpression).toString();
            setCurrentNumber(result);
            return
        }
        else {
            let result = math.evaluate(currentNumber).toString();
            setCurrentNumber(result)
            return
        }
    }




    const firstNumberDisplay = () => {
        if (currentNumber !== null) {
            return <Text style={currentNumber < 99999 ? [Styles.screenFirstNumber, { color: myColors.result }] : [Styles.screenFirstNumber, { fontSize: 40, color: myColors.result }]}>{currentNumber?.toString()}</Text>;
        }
        if (currentNumber && currentNumber.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{currentNumber}</Text>;
        }
        if (currentNumber === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
        }
        if (currentNumber.length > 5 && currentNumber.length < 50) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 30 }]}>
                    {currentNumber}
                </Text>
            );
        }
        if (currentNumber.length > 50 && lastNumber > 20) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 20 }]}>
                    {currentNumber}
                </Text>
            );
        }
    };


    return (
        <View style={Styles.viewBottom}>
            <View
                style={{
                    height: 150,
                    width: "90%",
                    justifyContent: "flex-end",
                    alignSelf: "center",
                }}
            >
                <Text style={Styles.screenSecondNumber}>
                    {lastNumber}</Text>
                <Text style={{ color: "purple", fontSize: 20, fontWeight: '300', textAlign: 'right' }}>{firstNumberDisplay()}</Text>

            </View>
            <View style={Styles.row}>
                {buttons.map((button) =>
                    button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ?
                        <Button key={button} title={button} isBlue onPress={() => handleInput(button)} />
                        : button === 0 ?
                            <Button key={button} title={button} onPress={() => handleInput(button)} />
                            : button === '.' ?
                                <Button key={button} title={button} onPress={() => handleInput(button)} />
                                : button === 'C' || button === '%' || button === '⌫' ?
                                    <Button key={button} title={button} isGray onPress={() => handleInput(button)} />
                                    :
                                    <Button key={button} title={button} onPress={() => handleInput(button)} />
                )}
            </View>
        </View >

    );
}