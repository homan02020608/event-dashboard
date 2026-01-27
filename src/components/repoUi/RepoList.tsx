"use client"
import { RepoDataTypes } from '@/types/type'
import React, { useState } from 'react'
import AddRepoButton from './AddRepoButton';
import { Button } from '../ui/button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import RepoCard from './RepoCard';

const RepoList = ({ repoData }: { repoData: RepoDataTypes[] }) => {
    const [isEditMode, setIsEditMode] = useState(false)
    return (
        <div>
            <div className='flex-Start flex-row gap-2 '>
                <AddRepoButton />
                {isEditMode ?
                    <>
                        <Button variant="outline">削除<DeleteIcon/></Button>
                        <Button variant="outline"onClick={() => setIsEditMode(false)}>キャンセル</Button>
                    </>
                    :
                    <>
                        <Button variant="outline" onClick={() => setIsEditMode(true)}>編集<ModeEditIcon /></Button>
                    </>
                }
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border p-2 '>
                {repoData.map((repo) => (
                    <div key={repo.id}>
                        <RepoCard
                            id={repo.id}
                            date={repo.date}
                            venue={repo.venue}
                            part={repo.part}
                            sheets={repo.sheets}
                            repoType={repo.repoType}
                            artistName={repo.artistName}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RepoList