import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddRepoButton from '@/components/repoUi/AddRepoButton';
import { getRepoList } from '../action/action';
import RepoDetailsDialog from '@/components/repoUi/RepoDetailsDialog';

const page = async () => {
    const repoData = await getRepoList()
    //console.log(repoData)

    return (
        <div className='flex-Center flex-col   m-4 p-4 bg-white shadow-xl'>
            <h1>Repo Page</h1>
            <AddRepoButton />
            <div className='w-full'>
                <div className='grid grid-cols-3 gap-4'>
                    {repoData.map((repo) => (
                        <div key={repo.id} className='w-full border-2 rounded-xl p-2 font-light text-sm bg-white'>
                            <div className='flex-Between text-xs'>
                                <h1 className=''>{repo.artistName}</h1>
                                <div>{repo.date.toLocaleDateString()}<StarBorderIcon fontSize='small' /></div>
                            </div>
                            <div className='flex-Between'>
                                <div>
                                    <div>{repo.part}部{repo.sheets}枚</div>
                                    <div>#{repo.repoType}</div>
                                </div>

                                <RepoDetailsDialog
                                    repoId={repo.id}
                                    artistName={repo.artistName}
                                    part={repo.part}
                                    sheets={repo.sheets}
                                    date={repo.date}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page