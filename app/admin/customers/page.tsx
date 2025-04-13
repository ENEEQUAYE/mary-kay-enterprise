"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import AdminLayout from "@/components/admin-layout"
import { toast } from "@/components/ui/use-toast"
import { Eye, MoreHorizontal, Search, UserPlus } from "lucide-react"

// Sample customers data (would be fetched from API in production)
const sampleCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    orders: 5,
    totalSpent: 629.94,
    createdAt: "2023-01-15T10:30:00Z",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    },
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    orders: 3,
    totalSpent: 239.85,
    createdAt: "2023-02-20T14:45:00Z",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "US",
    },
  },
  {
    id: "CUST-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    orders: 7,
    totalSpent: 1399.93,
    createdAt: "2023-03-10T09:15:00Z",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60007",
      country: "US",
    },
  },
  {
    id: "CUST-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    orders: 2,
    totalSpent: 299.0,
    createdAt: "2023-04-05T16:20:00Z",
    address: {
      street: "101 Maple Dr",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "US",
    },
  },
  {
    id: "CUST-005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 876-5432",
    orders: 1,
    totalSpent: 89.99,
    createdAt: "2023-05-18T11:10:00Z",
    address: {
      street: "202 Cedar Ln",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
      country: "US",
    },
  },
]

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(sampleCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState(sampleCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const customersPerPage = 10
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage)
  const indexOfLastCustomer = currentPage * customersPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer)

  // Filter customers based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query) {
      setFilteredCustomers(customers)
    } else {
      const lowercaseQuery = query.toLowerCase()
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(lowercaseQuery) ||
          customer.email.toLowerCase().includes(lowercaseQuery) ||
          customer.phone.includes(query),
      )
      setFilteredCustomers(filtered)
    }

    setCurrentPage(1)
  }

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsViewDialogOpen(true)
  }

  const handleAddCustomer = () => {
    // In a real app, this would be an API call
    const newId = `CUST-${(customers.length + 1).toString().padStart(3, "0")}`

    const customerToAdd = {
      id: newId,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      orders: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    }

    setCustomers([...customers, customerToAdd])
    setFilteredCustomers([...customers, customerToAdd])
    setIsAddDialogOpen(false)
    setNewCustomer({ name: "", email: "", phone: "" })

    toast({
      title: "Customer added",
      description: `${customerToAdd.name} has been added to the customer list.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>
              Manage your customer database. You have {filteredCustomers.length} customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell className="text-right">GH₵{customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{formatDate(customer.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details - {selectedCustomer?.id}</DialogTitle>
            <DialogDescription>
              Customer since {selectedCustomer && formatDate(selectedCustomer.createdAt)}
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <p>
                    <span className="font-medium">Name:</span> {selectedCustomer.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {selectedCustomer.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {selectedCustomer.phone}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  {selectedCustomer.address.street ? (
                    <>
                      <p>{selectedCustomer.address.street}</p>
                      <p>
                        {selectedCustomer.address.city}, {selectedCustomer.address.state}{" "}
                        {selectedCustomer.address.zipCode}
                      </p>
                      <p>{selectedCustomer.address.country}</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No address provided</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Order History</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <p className="text-3xl font-bold">{selectedCustomer.orders}</p>
                      <p className="text-muted-foreground">Total Orders</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <p className="text-3xl font-bold">${selectedCustomer.totalSpent.toFixed(2)}</p>
                      <p className="text-muted-foreground">Total Spent</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Edit Customer</Button>
                <Button>View Orders</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Enter the customer details below</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer} disabled={!newCustomer.name || !newCustomer.email}>
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
