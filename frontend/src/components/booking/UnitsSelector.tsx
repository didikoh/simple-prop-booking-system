
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import "./UnitsSelector.css"

type UnitsSelectorProps = {
  selectedLevel: string;
  locked: boolean;
  blocked: boolean;
  available: boolean;
};


const levels = [
  {
    name: "50",
    units: [
      { id: "01", size: "1000 sqft", locked: false, blocked: true },
      { id: "02", size: "950 sqft", locked: false, blocked: false },
    ],
  },
  {
    name: "49",
    units: [
      { id: "01", size: "900 sqft", locked: false, blocked: true },
      { id: "02", size: "920 sqft", locked: true, blocked: false },
    ],
  },
];

function UnitsSelector({ selectedLevel, locked, blocked, available }: UnitsSelectorProps) {
  // Filter levels
  const filteredLevels = levels.filter(level =>
    !selectedLevel || level.name === selectedLevel
  );

  return (
    <div className="units-selector">
      {filteredLevels.map((level) => {
        // Filter units by status
        const filteredUnits = level.units.filter(unit => {
          if (locked && !unit.locked) return false;
          if (blocked && !unit.blocked) return false;
          if (available && (unit.locked || unit.blocked)) return false;
          return true;
        });
        if (filteredUnits.length === 0) return null;
        return (
          <div className="units-container" key={level.name}>
            <div className="level">Level {level.name}:</div>
            <div className="btns">
              {filteredUnits.map((unit) => (
                <button
                  className={`btn ${unit.locked ? " locked" : ""}${unit.blocked ? " blocked" : ""}`}
                  key={level.name + unit.id}
                >
                  <div className="icons">
                    {unit.locked && <FaLock />}
                    {unit.blocked && <MdBlock />}
                    {!unit.blocked && !unit.locked && <FaUnlock />}
                  </div>
                  <p>{level.name + " - " + unit.id}</p>
                  <p>{unit.size}</p>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UnitsSelector