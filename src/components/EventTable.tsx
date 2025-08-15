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

export function EventTable() {
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.Event}>
              <TableCell className="font-medium  ">{invoice.Event}</TableCell>
              <TableCell className=" ">{invoice.region}</TableCell>
              <TableCell className="text-right ">01/01</TableCell>
              <TableCell className="text-right ">済</TableCell>
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
