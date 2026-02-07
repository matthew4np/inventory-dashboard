// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Loan = {
  id: string;
  staff_id: string;
  asset_id: string;
  status: 'Checked In' | 'Checked Out';
  date: string;
}

export type LatestLoan = {
    id: string,
    name: string,
    model: string,
    status: string,
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Staff = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestInvoiceRaw = Omit<LatestLoan, 'amount'> & {
//   amount: number;
// };

export type StaffTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type LoansTable = {
    id: string,
    date: string,
    status: string,
    model: string,
    name: string,
    dept: string,
};

export type FormattedStaffTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type Loanfield = {
    asset_id: string,
    asset_type: string,
}

export type StaffField = {
  id: string,
  name: string,
  dept: string,
  email: string,
  assets: string,
};

export type AssetField = {
  id: string,
  model: string,
  brand: string,
  serial: string,
};

export type LoanForm = {
  id: string,
  staff_id: string,
  asset_id: string,
  status: string,
};