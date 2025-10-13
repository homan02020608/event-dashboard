import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AddIcon from '@mui/icons-material/Add';

const AddRepoButton = () => {
    return (
        <div className='w-full py-2'>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline">レポ追加<AddIcon /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>レポ追加</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="artist_name">アーティスト名</Label>
                                <Input id="artist_name" name="artist_name" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="venue">会場名</Label>
                                <Input id="venue" name="venue" />
                            </div>
                            <div className='flex-Center gap-4'>
                                <div className="grid gap-2 w-full ">
                                    <Label htmlFor="repoType">レポ種類</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="レポ種類選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="online_meeting">オンライン話し会</SelectItem>
                                            <SelectItem value="real_meeting">リアル話し会</SelectItem>
                                            <SelectItem value="online_sign">オンラインサイン会</SelectItem>
                                            <SelectItem value="real_sign">リアルサイン会</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2 w-full ">
                                    <Label htmlFor="part">部数</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="部数選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">第1部</SelectItem>
                                            <SelectItem value="2">第2部</SelectItem>
                                            <SelectItem value="3">第3部</SelectItem>
                                            <SelectItem value="4">第4部</SelectItem>
                                            <SelectItem value="5">第5部</SelectItem>
                                            <SelectItem value="6">第6部</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2 w-full ">
                                    <Label htmlFor="sheets">枚数</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="枚数選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="6">6</SelectItem>
                                            <SelectItem value="7">7</SelectItem>
                                            <SelectItem value="8">8</SelectItem>
                                            <SelectItem value="9">9</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-2 ">
                                <Label htmlFor="conversations">会話レポ</Label>
                                <div className='flex-Center w-full border hover:cursor-pointer hover:bg-gray-100 rounded-sm'>
                                    <AddIcon fontSize='small' className='text-gray-600 '/>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default AddRepoButton