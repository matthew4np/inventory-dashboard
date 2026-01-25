import { Loanfield } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createLoan } from '@/app/lib/actions';

export default function Form({ loans }: { loans: Loanfield[] }) {
  return (
    <form action={createLoan}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Asset ID*/}
        <div className="mb-4">
          <label htmlFor="asset_id" className="mb-2 block text-sm font-medium">
            Choose an Asset ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="asset_id"
                name="asset_id"
                type="string"
                step="0.01"
                placeholder="Enter Asset ID"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Asset Type*/}
        <div className="mb-4">
          <label htmlFor="asset_type" className="mb-2 block text-sm font-medium">
            Choose an Asset Type
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="asset_type"
                name="asset_type"
                type="string"
                step="0.01"
                placeholder="Enter Asset Type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Serial Number */}
        <div className="mb-4">
          <label htmlFor="serial_number" className="mb-2 block text-sm font-medium">
            Input the Serial Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="serial_number"
                name="serial_number"
                type="string"
                step="0.01"
                placeholder="Enter Serial Number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Staff Name */}
        <div className="mb-4">
          <label htmlFor="staff_name" className="mb-2 block text-sm font-medium">
            Input the Staff Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="staff_name"
                name="staff_name"
                type="string"
                step="0.01"
                placeholder="Enter Staff Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

       {/* Staff Department */}
        <div className="mb-4">
          <label htmlFor="staff_dept" className="mb-2 block text-sm font-medium">
            Input the Staff Department
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="staff_dept"
                name="staff_dept"
                type="string"
                step="0.01"
                placeholder="Enter Staff Department"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

       {/* Status Date */}
        <div className="mb-4">
          <label htmlFor="status_date" className="mb-2 block text-sm font-medium">
            Input the Status Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="status_date"
                name="status_date"
                type="string"
                step="0.01"
                placeholder="Enter Status Date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        
        {/* Loan Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the loan status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="loan_status"
                  name="loan_status"
                  type="radio"
                  value="Checked In"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="loan_status"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Checked In <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="loan_status"
                  name="loan_status"
                  type="radio"
                  value="Checked Out"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="loan_status"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Checked-Out <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>




      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/loans"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Loan</Button>
      </div>
    </form>
  );
}
