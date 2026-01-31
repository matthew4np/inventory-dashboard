import Form from '@/app/ui/loans2/edit-form';
import Breadcrumbs from '@/app/ui/loans2/breadcrumbs';
import { fetchLoanById, fetchStaff, fetchAssets } from '@/app/lib/loan2data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [loan, staff, assets] = await Promise.all([
  fetchLoanById(id),
  fetchStaff(),
  fetchAssets(),
  ]);

    if (!loan) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'loan', href: '/dashboard/loans2' },
          {
            label: 'Edit Loan',
            href: `/dashboard/loans2/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form loan={loan} staff={staff} assets={assets} />
    </main>
  );
}