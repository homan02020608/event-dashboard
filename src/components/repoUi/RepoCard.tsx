import { RepoDataTypes } from '@/types/type'
import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RepoDetailsDialog from './RepoDetailsDialog';
import { Checkbox } from '../ui/checkbox';

interface RepoCardProps extends RepoDataTypes {
    isSelected: boolean
    isEditMode: boolean
    onToggle: () => void
}

const RepoCard = ({ id, artistName, part, sheets, date, venue, repoType, isSelected, isEditMode, onToggle }: RepoCardProps) => {
    return (
        <div className={`${isSelected && 'border-teal-500 ring-2 ring-teal-200 '}w-full border-2 rounded-xl p-2 font-light text-xs bg-white *:my-1`}>
            <div className='flex-Between text-sm'>
                <Checkbox
                    className={`${isEditMode?'visible':'invisible'} `}
                    checked={isSelected}
                    onCheckedChange={onToggle}
                />
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