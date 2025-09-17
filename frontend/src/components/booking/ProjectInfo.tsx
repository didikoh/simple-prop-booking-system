import { FaInfoCircle, FaRegCalendarCheck, FaBuilding, FaDoorOpen } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { GrUserManager } from "react-icons/gr"
import "./ProjectInfo.css"

const ProjectInfo = () => {
    return (
        <div className='info'>
            <div className='item'>
                <div className='icon'>
                    < FaInfoCircle />
                </div>
                <div className="text">
                    <p className="title">Project Name:</p>
                    <p className="content">Project A</p>
                </div>
            </div>
            <div className='item'>
                <div className='icon'>
                    <GrUserManager />
                </div>
                <div className="text">
                    <p className="title">Developer:</p>
                    <p className='content'>Z developer</p>
                </div>
            </div>
            <div className='item'>
                <div className='icon'>
                    <FaRegCalendarCheck />
                </div>
                <div className="text">
                    <p className="title">Estimate Complete Year:</p>
                    <p className='content'>2028</p>
                </div>
            </div>

            <div className='item'>
                    <div className='icon'>
                        <FaBuilding />
                    </div>
                <div className="text">
                    <p className="title">Total Units:</p>
                    <p className='content'>500</p>
                </div>
            </div>
                <div className='item'>
                    <div className='icon'>
                        <FaDoorOpen />
                    </div>
                <div className="text">
                    <p className="title">Available Units:</p>
                    <p className='content'>100</p>
                </div>
            </div>
            <div className='item'>
                <div className='icon'>
                    <IoLocationOutline />
                </div>
                <div className="text">
                    <p className="title">Address:</p>
                    <p className='content'>Address 1, Address 2, Postcode</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo