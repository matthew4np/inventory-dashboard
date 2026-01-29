import Form from '@/app/ui/loans2/create-form';
import Breadcrumbs from '@/app/ui/loans2/breadcrumbs';
import { fetchStaff, fetchAssets } from '@/app/lib/loan2data';
 
export default async function Page() {
  const staff = await fetchStaff();
  const assets = await fetchAssets();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Loans', href: '/dashboard/loans2' },
          {
            label: 'Create Loan',
            href: '/dashboard/loans2/create',
            active: true,
          },
        ]}
      />
      <Form staff={staff} assets={assets}/>
    </main>
  );
}