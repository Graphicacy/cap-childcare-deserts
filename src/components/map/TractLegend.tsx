import { createElement } from 'react';
import { Colors } from '../colors';
import {
  tractLegendClass,
  tractLegendEntryBlockClass,
  tractLegendEntryCircleClass,
  tractLegendEntryClass,
  tractLegendEntryTextClass
} from './styles';

const entries = [
  { color: Colors.ORANGE, text: 'Child care desert', circle: false },
  { color: Colors.GRAY, text: 'Not a child care desert', circle: false },
  { color: Colors.BLUE, text: 'Child care center', circle: true },
  { color: Colors.LIGHT_BLUE, text: 'Family child care provider', circle: true }
];

function makeEntry(entry: { color: string; text: string; circle: boolean }) {
  return (
    <span key={entry.color} className={tractLegendEntryClass}>
      <span
        className={
          entry.circle
            ? tractLegendEntryCircleClass
            : tractLegendEntryBlockClass
        }
        style={{ backgroundColor: entry.color }}
      />
      <span className={tractLegendEntryTextClass}>
        {entry.text}
      </span>
    </span>
  );
}

const entryElements = entries.map(makeEntry);

const TractLegend: React.StatelessComponent<{}> = () =>
  <div className={tractLegendClass}>
    {entryElements}
  </div>;

export default TractLegend;
