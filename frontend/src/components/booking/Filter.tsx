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
    const handleToggle = (name: string) => {
        onChange({
            level: selectedLevel,
            locked: name === "locked" ? !locked : false,
            blocked: name === "blocked" ? !blocked : false,
            available: name === "available" ? !available : false,
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
                <button
                    type="button"
                    className={`filter-toggle${locked ? ' active' : ''}`}
                    onClick={() => handleToggle('locked')}
                >
                    {locked ? 'Locked ✓' : 'Locked'}
                </button>
                <button
                    type="button"
                    className={`filter-toggle${blocked ? ' active' : ''}`}
                    onClick={() => handleToggle('blocked')}
                >
                    {blocked ? 'Blocked ✓' : 'Blocked'}
                </button>
                <button
                    type="button"
                    className={`filter-toggle${available ? ' active' : ''}`}
                    onClick={() => handleToggle('available')}
                >
                    {available ? 'Available ✓' : 'Available'}
                </button>
            </div>
        </div>
    )
}

export default Filter