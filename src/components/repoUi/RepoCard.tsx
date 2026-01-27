import { RepoDataTypes } from '@/types/type'
import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RepoDetailsDialog from './RepoDetailsDialog';
import { Checkbox } from '../ui/checkbox';


const RepoCard = ({ id, artistName, part, sheets, date, venue, repoType }: RepoDataTypes) => {
    return (
        <div className='w-full border-2 rounded-xl p-2 font-light text-xs bg-white *:my-1'>
            
            <div className='flex-Between text-sm'>
                <Checkbox/>
                <h1 className='font-light text-lg'>{artistName} {part}部</h1>
                <div><StarBorderIcon fontSize='small' /></div>
                
            </div>
            <div className='flex-Between'>
                <div>
                    {date.toLocaleDateString('ja')}
                    <div>#{repoType}</div>
                </div>
                <RepoDetailsDialog
                    repoId={id}
                    artistName={artistName}
                    part={part}
                    sheets={sheets}
                    date={date}
                    venue={venue}
                />
            </div>
        </div>
    )
}

export default RepoCard