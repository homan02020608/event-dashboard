"use client"
import { RepoDataTypes } from '@/types/type'
import React, { useState } from 'react'
import AddRepoButton from './AddRepoButton';
import { Button } from '../ui/button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import RepoCard from './RepoCard';
import { deleteReport } from '@/app/action/action';
import { toast } from 'sonner';
import DeleteConfirmAlertDialog from './DeleteConfirmAlertDialog';
import SortDropdownMenu from './SortDropdownMenu';
import FilterSheetMenu from './FilterSheetMenu';

const RepoList = ({ repoData }: { repoData: RepoDataTypes[] }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedRepoId, setSelectedRepoId] = useState<Set<string>>(new Set());
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);

    //checkBoxのtrue/false判定
    const selectCheckBox = (id: string) => {
        const newSelectedRepo = new Set(selectedRepoId);
        if (newSelectedRepo.has(id)) {
            newSelectedRepo.delete(id)
        } else {
            newSelectedRepo.add(id)
        }
        setSelectedRepoId(newSelectedRepo);
    }

    //編集モードから退出、checkbox reset
    const exitEditMode = () => {
        setIsEditMode(false)
        setSelectedRepoId(new Set())
    }

    //削除プロセス処理
    const handleDelete = async () => {
        if (selectedRepoId.size === 0) return;

        const result = await deleteReport(Array.from(selectedRepoId));

        if (result.success) {
            setShowConfirmAlert(false)
            toast("削除成功しました", { position: 'bottom-center' })
            setIsEditMode(false)
            setSelectedRepoId(new Set());
        } else {
            toast('削除失敗、しばらくしてからもう一度お試しください', { position: 'bottom-center' })
        }
    }

    return (
        <div>
            <div className='flex-Between flex-row gap-2 overflow-auto'>
                <div className='flex-Center gap-2 '>
                    <AddRepoButton />
                    {isEditMode ?
                        <>
                            <Button
                                variant="outline"
                                disabled={selectedRepoId.size === 0}
                                onClick={() => setShowConfirmAlert(true)}
                            >
                                削除
                                <DeleteIcon />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={exitEditMode}
                            >
                                キャンセル
                            </Button>
                        </>
                        :
                        <>
                            <Button variant="outline" onClick={() => setIsEditMode(true)}>編集<ModeEditIcon /></Button>
                        </>
                    }
                </div>
                <div className='flex-Center gap-2'>
                   <SortDropdownMenu/>
                   <FilterSheetMenu/>
                </div>
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
                            isPublic={repo.isPublic}
                            isBookmarked={repo.isBookmarked}
                            isSelected={selectedRepoId.has(repo.id)}
                            isEditMode={isEditMode}
                            onToggle={() => selectCheckBox(repo.id)}
                        />
                    </div>
                ))}
            </div>
            {/* 削除確認AlertDialog */}
            <DeleteConfirmAlertDialog
                open={showConfirmAlert}
                onOpenChange={setShowConfirmAlert}
                onConfirmDelete={handleDelete}
                count={selectedRepoId.size}
            />
        </div>
    )
}

export default RepoList