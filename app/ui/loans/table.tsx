import Image from 'next/image';
import { UpdateLoan, DeleteLoan } from '@/app/ui/loans/buttons';
import LoanStatus from '@/app/ui/loans/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredLoans } from '@/app/lib/data';

export default async function LoansTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const loans = await fetchFilteredLoans(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {loans?.map((loans) => (
              <div
                key={loans.asset_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{loans.staff_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{loans.staff_dept}</p>
                  </div>
                  <LoanStatus status={loans.loan_status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(loans.status_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateLoan id={loans.asset_id} />
                    <DeleteLoan id={loans.asset_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Asset ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Asset Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Serial Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Staff Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Loan Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loans?.map((loans) => (
                <tr
                  key={loans.asset_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{loans.staff_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {loans.staff_dept}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {loans.staff_dept}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(loans.status_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <LoanStatus status={loans.loan_status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLoan id={loans.asset_id} />
                      <DeleteLoan id={loans.asset_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
