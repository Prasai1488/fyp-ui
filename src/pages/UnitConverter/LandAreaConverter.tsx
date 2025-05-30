import React, { useState } from "react";
import "./landAreaConverter.scss";

const areaUnits = {
  bigha: 6772.63,
  kattha: 338.63,
  dhur: 16.93,
  ropani: 508.72,
  aana: 31.8,
  paisa: 7.95,
  daam: 1.99,
  sqm: 1,
  sqft: 0.092903,
};

type Unit = keyof typeof areaUnits;

const unitOptions: { label: string; value: Unit }[] = [
  { label: "Bigha", value: "bigha" },
  { label: "Kattha", value: "kattha" },
  { label: "Dhur", value: "dhur" },
  { label: "Ropani", value: "ropani" },
  { label: "Aana", value: "aana" },
  { label: "Paisa", value: "paisa" },
  { label: "Daam", value: "daam" },
  { label: "Square Meter", value: "sqm" },
  { label: "Square Feet", value: "sqft" },
];

const LandAreaConverter: React.FC = () => {
  const [fromUnit, setFromUnit] = useState<Unit>("bigha");
  const [toUnit, setToUnit] = useState<Unit>("ropani");
  const [amount, setAmount] = useState<number>(0);
  const [converted, setConverted] = useState<number | null>(null);

  const convert = () => {
    const sqmValue = amount * areaUnits[fromUnit];
    const result = sqmValue / areaUnits[toUnit];
    setConverted(result);
  };

  return (
    <div className="land-area-converter">
      <h2>Land Area Unit Converter (Nepal)</h2>

      <div>
        <label>From: </label>
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value as Unit)}
        >
          {unitOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>To: </label>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value as Unit)}
        >
          {unitOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>

      <button onClick={convert}>Convert</button>

      {converted !== null && (
        <div className="result">
          Converted Value: {converted.toFixed(4)} {toUnit}
        </div>
      )}
    </div>
  );
};

export default LandAreaConverter;
