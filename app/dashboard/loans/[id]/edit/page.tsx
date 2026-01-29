import Form from '@/app/ui/loans/edit-form';
import Breadcrumbs from '@/app/ui/loans/breadcrumbs';
import { fetchLoansById } from '@/app/lib/loandata';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'loans', href: '/dashboard/loans' },
          {
            label: 'Edit Loan',
            href: `/dashboard/loans/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form loan={loan} loan={loan} />
    </main>
  );
}