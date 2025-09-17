import { FaInfoCircle, FaRegCalendarCheck, FaBuilding, FaDoorOpen } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { GrUserManager } from "react-icons/gr"
import "./ProjectInfo.css"
import { useEffect } from "react"

const ProjectInfo = ({projectData}: any) => {
    useEffect(() => {
      console.log(projectData);
    }, [projectData])
    
    return (
        <div className='info'>
            <div className='item'>
                <div className='icon'>
                    < FaInfoCircle />
                </div>
                <div className="text">
                    <p className="title">Project Name:</p>
                    <p className="content">{projectData ? projectData.name : 'Loading...'}</p>
                </div>
            </div>
            <div className='item'>
                <div className='icon'>
                    <GrUserManager />
                </div>
                <div className="text">
                    <p className="title">Developer:</p>
                    <p className='content'>{projectData ? projectData.developer.name : 'Loading...'}</p>
                </div>
            </div>
            <div className='item'>
                <div className='icon'>
                    <FaRegCalendarCheck />
                </div>
                <div className="text">
                    <p className="title">Estimate Complete Year:</p>
                    <p className='content'>{projectData ? projectData.completion_year : 'Loading...'}</p>
                </div>
            </div>

            <div className='item'>
                <div className='icon'>
                    <FaBuilding />
                </div>
                <div className="text">
                    <p className="title">Total Units:</p>
                    <p className='content'>{projectData ? projectData.units_total : 'Loading...'}</p>
                </div>
            </div>
            <div className='item'>
                <div className='icon'>
                    <FaDoorOpen />
                </div>
                <div className="text">
                    <p className="title">Available Units:</p>
                    <p className='content'>{projectData ? projectData.units_available : 'Loading...'}</p>
                </div>
            </div>
            <div className='item'>
                <div className='icon'>
                    <IoLocationOutline />
                </div>
                <div className="text">
                    <p className="title">Address:</p>
                    <p className='content'>{projectData ? projectData.address : 'Loading...'}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo