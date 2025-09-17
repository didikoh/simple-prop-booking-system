

import { useEffect, useState } from "react";
import ProjectInfo from "./booking/ProjectInfo";
import Filter from "./booking/Filter";
import UnitsSelector from "./booking/UnitsSelector";
import "./BookingContainer.css"
import axios from "axios";
import BookingForm from "./form/BookingForm";

const BookingContainer = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const [locked, setLocked] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [available, setAvailable] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [project, setProject] = useState('Project A');
    const [projectData, setProjectData] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleFilterChange = (filter: any) => {
        setSelectedLevel(filter.level);
        setLocked(filter.locked);
        setBlocked(filter.blocked);
        setAvailable(filter.available);
    };

    // Fetch project data
    const fetchUnits = async () => {
        const result = await axios.get(apiUrl + 'projects/' + project);
        console.log(result.data);
        setProjectData(result.data);
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    return (
        <div className='booking-container'>
            <div className='header'> Project A</div>
            <ProjectInfo projectData={projectData} />
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
                projectData={projectData}
                setSelectedUnit={setSelectedUnit}
            />
            {selectedUnit != null && (
                <BookingForm
                    onClose={() => setSelectedUnit(null)}
                    selectedUnit={selectedUnit}
                    onBookingSuccess={()=>fetchUnits()}
                />
            )}
        </div>
    )
}

export default BookingContainer