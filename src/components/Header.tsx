
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
    return (
        <div className='flex-Between rounded-t-lg shadow-2xl bg-white/70 m-2 mx-4 p-2'>
            <div>Dashboard Overview</div>
            <div className='flex-Center '>
                <div className="flex-Center text-black  gap-4 *:hover:bg-gray-200 *:rounded-md *:hover:cursor-pointer">
                    <NotificationsIcon style={{fontSize : 32, padding : 4}} />
                    <PersonIcon style={{fontSize : 32, padding : 4}}/>
                </div>
            </div>
        </div>
    )
}

export default Header