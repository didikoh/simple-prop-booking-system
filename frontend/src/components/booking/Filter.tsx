import "./Filter.css"


const levels = ["50", "49"];

const Filter = ({ selectedLevel, locked, blocked, available, onChange }: any) => {
    const handleLevelChange = (e: any) => {
        onChange({
            level: e.target.value,
            locked,
            blocked,
            available,
        });
    };
    const handleCheckboxChange = (e: any) => {
        const { name, checked } = e.target;
        onChange({
            level: selectedLevel,
            locked: name === "locked" ? checked : locked,
            blocked: name === "blocked" ? checked : blocked,
            available: name === "available" ? checked : available,
        });
    };
    return (
        <div className='filter'>
            <div className="filter-title">Filter Units</div>
            <div className="filter-group">
                <label htmlFor="level-select">Level:</label>
                <select
                    id="level-select"
                    className="filter-select"
                    value={selectedLevel}
                    onChange={handleLevelChange}
                >
                    <option value="">All</option>
                    {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>
            <div className="filter-group">
                <label>
                    <input
                        type="checkbox"
                        className="filter-checkbox"
                        name="locked"
                        checked={locked}
                        onChange={handleCheckboxChange}
                    /> Locked
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="filter-checkbox"
                        name="blocked"
                        checked={blocked}
                        onChange={handleCheckboxChange}
                    /> Blocked
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="filter-checkbox"
                        name="available"
                        checked={available}
                        onChange={handleCheckboxChange}
                    /> Available
                </label>
            </div>
        </div>
    )
}

export default Filter