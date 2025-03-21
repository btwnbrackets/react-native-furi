import {
  View,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { furigana } from './furi';
import RubyBlock from './RubyBlock';

type Props = {
  expression: string;
  reading?: string;
  baseStyle?: StyleProp<TextStyle>;
  furiganaStyle?: StyleProp<TextStyle>;
  entryContainerStyle?: StyleProp<ViewStyle>;
  showFurigana?: boolean;
};

export default function RubySentence({
  expression,
  reading,
  baseStyle,
  furiganaStyle,
  entryContainerStyle,
  showFurigana = true,
}: Props) {
  const parts = furigana(expression, reading ? reading : '');
  return (
    <View style={styles.container}>
      {parts.map((part, i) => {
        return (
          <RubyBlock
            key={i}
            base={part.token}
            furigana={part.reading}
            baseStyle={[styles.base, baseStyle]}
            furiganaStyle={[
              styles.furigana,
              furiganaStyle,
              !showFurigana && styles.hideFuri,
            ]}
            containerStyle={[styles.entry, entryContainerStyle]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  hideFuri: {
    color: 'transparent',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  furigana: {
    fontSize: 10,
    lineHeight: 15,
  },
  base: {
    fontSize: 20,
    lineHeight: 25,
  },
  entry: {
    paddingVertical: 8,
  },
});
