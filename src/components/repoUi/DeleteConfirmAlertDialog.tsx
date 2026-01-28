import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type DeleteConfirmAlertProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void
    onConfirmDelete: () => void
    count: number
}

const DeleteConfirmAlertDialog = ({ open, onOpenChange, onConfirmDelete, count }: DeleteConfirmAlertProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                        選択された{count}件のレポートを削除します。<br/>
                        この操作は取り消せません。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirmDelete}
                        className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
                    >
                        削除する
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteConfirmAlertDialog