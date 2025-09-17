
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import "./UnitsSelector.css"
import { BsHouseCheckFill } from "react-icons/bs";
import { useState } from "react";

type UnitsSelectorProps = {
  selectedLevel: string;
  locked: boolean;
  blocked: boolean;
  available: boolean;
  projectData: any;
  setSelectedUnit: (unit:any) => void;
};

function UnitsSelector({ selectedLevel, locked, blocked, available, projectData, setSelectedUnit }: UnitsSelectorProps) {
  // Filter levels
  if (!projectData || !projectData.levels) return <div>No data available</div>;
  const filteredLevels = projectData.levels.filter((level: any) =>
    !selectedLevel || level.level_number === selectedLevel
  );

  const handleUnitClick = (unit: any) => {
    if (unit.status === "available") {
      setSelectedUnit(unit);
    }
  }

  return (
    <div className="units-selector">
      {filteredLevels.map((level: any) => {
        // Filter units by status
        const filteredUnits = level.units.filter((unit: any) => {
          if (locked && !(unit.status === "locked")) return false;
          if (blocked && !(unit.status === "blocked")) return false;
          if (available && !(unit.status === "available")) return false;
          return true;
        });
        if (filteredUnits.length === 0) return null;
        return (
          <div className="units-container" key={level.level_number}>
            <div className="level">Level {level.level_number}:</div>
            <div className="btns">
              {filteredUnits.map((unit: any) => (
                <button
                  className={`btn ${unit.status === "locked" ? " locked" : ""}${unit.status === "blocked" ? " blocked" : ""}${unit.status === "sold" ? " sold" : ""}`}
                  key={unit.unit_number}
                  onClick={() => { handleUnitClick(unit) }}
                >
                  <div className="icons">
                    {unit.status === "locked" && <FaLock />}
                    {unit.status === "blocked" && <MdBlock />}
                    {unit.status === "available" && <FaUnlock />}
                    {unit.status === "sold" && <BsHouseCheckFill />}
                  </div>
                  <p>{unit.unit_number}</p>
                  <p>{unit.size_sqft} sqft</p>
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