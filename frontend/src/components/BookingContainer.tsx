

import { useState } from "react";
import ProjectInfo from "./booking/ProjectInfo";
import Filter from "./booking/Filter";
import UnitsSelector from "./booking/UnitsSelector";
import "./BookingContainer.css"

const BookingContainer = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const [locked, setLocked] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [available, setAvailable] = useState(false);

    const handleFilterChange = (filter:any) => {
        setSelectedLevel(filter.level);
        setLocked(filter.locked);
        setBlocked(filter.blocked);
        setAvailable(filter.available);
    };

    return (
        <div className='booking-container'>
            <div className='header'> Project A</div>
            <ProjectInfo />
            <div className='seperator' />
            <Filter
                selectedLevel={selectedLevel}
                locked={locked}
                blocked={blocked}
                available={available}
                onChange={handleFilterChange}
            />
            <div className='seperator' />
            <UnitsSelector
                selectedLevel={selectedLevel}
                locked={locked}
                blocked={blocked}
                available={available}
            />
        </div>
    )
}

export default BookingContainer