import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EventCardTypes } from "@/types/type"

const invoices = [
  {
    Event: "INV001",
    region: "東京都",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    Event: "INV002",
    region: "東京都",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    Event: "INV003",
    region: "東京都",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    Event: "INV004",
    region: "東京都",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    Event: "INV005",
    region: "東京都",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    Event: "INV006",
    region: "東京都",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    Event: "INV007",
    region: "東京都",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

type EventsListProps = {
  events: EventCardTypes[]
}

const STATUS_LABEL = {
  PLANNED: '参加予定',
  ATTENDED: '参加済み',
  CANCELLED: 'キャンセル'
}

export function EventTable({ events }:EventsListProps ) {

  return (
    <div className="max-w-xl lg:max-w-2xl w-full p-8 rounded-xl shadow-xl overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">イベント</TableHead>
            <TableHead className="w-[100px]">地域</TableHead>
            <TableHead className="w-[100px]">日付</TableHead>
            <TableHead className="w-[100px]">ステータス</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium  ">{event.title}</TableCell>
              <TableCell className=" ">{event.region}</TableCell>
              <TableCell className="text-right ">{event.date?.toLocaleDateString('ja-JP')}</TableCell>
              <TableCell className="text-right ">{STATUS_LABEL[event.status]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
