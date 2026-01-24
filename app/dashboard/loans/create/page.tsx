import Form from '@/app/ui/loans/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchLatestLoans } from '@/app/lib/data';
 
export default async function Page() {
  const loans = await fetchLatestLoans();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Loans', href: '/dashboard/loans' },
          {
            label: 'Create Loan',
            href: '/dashboard/loans/create',
            active: true,
          },
        ]}
      />
      <Form loans={loans} />
    </main>
  );
}