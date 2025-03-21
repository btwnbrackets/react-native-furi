import { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import { RubySentence } from 'react-native-furi';

export default function App() {
  const [showFurigana, setShowFurigana] = useState(true);
  const [reading, setReading] = useState<string>('');
  const [expression, setExpression] = useState<string>('');

  const toggleFuri = () => {
    setShowFurigana((prev) => !prev);
  };

  const examples = [
    { expression: '韓国', reading: 'かんこく' },
    { expression: '入る', reading: 'はいる' },
    { expression: 'お願い', reading: 'おねがい' },
    { expression: '台湾', reading: 'タイワン' },
    { expression: 'お茶', reading: 'おちゃ' },
    { expression: '申し込む', reading: 'もうしこむ' },
    { expression: '食べ方', reading: 'たべかた' },
    { expression: 'ここ', reading: 'ここ' },
    { expression: 'タクシー', reading: '' },
    { expression: 'アイス', reading: 'あいす' },
    {
      expression:
        'もしもし、聞こえてますか？アイスを食べたいけど食べ方を忘れました',
      reading:
        'もしもし、きこえてますか？アイスをたべたいけどたべかたをわすれました',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.try}>
        <Text style={styles.header}>Try it yourself :D</Text>
        <Button
          title={`${showFurigana ? 'Hide' : 'Show'} furigana`}
          onPress={toggleFuri}
        />
        <RubySentence
          expression={expression}
          reading={reading}
          showFurigana={showFurigana}
        />
        <TextInput
          placeholder="Expression"
          style={styles.textInput}
          value={expression}
          onChange={(e) => setExpression(e.nativeEvent.text)}
        />
        <TextInput
          placeholder="Reading"
          style={styles.textInput}
          value={reading}
          onChange={(e) => setReading(e.nativeEvent.text)}
        />
      </View>
      <View style={styles.example}>
        <Text style={styles.header}>Examples</Text>

        <FlatList
          contentContainerStyle={styles.flatList}
          keyExtractor={(item) => item.expression}
          data={examples}
          renderItem={({ item }) => (
            <RubySentence
              expression={item.expression}
              reading={item.reading}
              showFurigana={showFurigana}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    marginVertical: 8,
    alignSelf: 'stretch',
  },
  try: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 16,
  },
  example: {
    flex: 1,
    gap: 16,
  },
  flatList: { flexGrow: 1, padding: 16, width: '100%' },
});
