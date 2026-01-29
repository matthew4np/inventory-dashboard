import Image from 'next/image';
import { UpdateLoan, DeleteLoan } from '@/app/ui/loans2/buttons';
import LoanStatus from '@/app/ui/loans2/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredLoans } from '@/app/lib/loan2data';

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
                key={loans.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{loans.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{loans.dept}</p>
                  </div>
                  <LoanStatus status={loans.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(loans.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateLoan id={loans.id} />
                    <DeleteLoan id={loans.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dept
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Model
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loans?.map((loans) => (
                <tr
                  key={loans.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{loans.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {loans.dept}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {loans.model}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(loans.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <LoanStatus status={loans.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLoan id={loans.id} />
                      <DeleteLoan id={loans.id} />
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
