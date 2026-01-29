// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data



const staff = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Name 0',
    dept: 'Dept 1',
    email: 'staffname0@acme.com',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Name 1',
    dept: 'Dept 2',
    email: 'staffname1@acme.com',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Name 2',
    dept: 'Dept 3',
    email: 'staffname2@acme.com',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Name 3',
    dept: 'Dept 1',
    email: 'staffname3@acme.com',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Name 4',
    dept: 'Dept 2',
    email: 'staffname4@acme.com',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Name 5',
    dept: 'Dept 3',
    email: 'staffname5@acme.com',
  },
];

const assets = [
  { id: "505b53fc-f2cf-4cf9-a396-742cb375af1c",
    model: 'Model 0',
    brand: 'Brand 0',
    serial: 'Serial 0',
  },
  {
    id: "a5e2b7dd-3cda-46cb-83d0-f64495348cfb",
    model: 'Model 1',
    brand: 'Brand 1',
    serial: 'Serial 1',
  }, 
  {
    id: "c08cc73d-f571-4298-ad93-87af568fb76c",
    model: 'Model 2',
    brand: 'Brand 2',
    serial: 'Serial 2',
  },
  {
    id: "a8596773-173e-4bb8-bb03-e10ebb42d676",
    model: 'Model 3',
    brand: 'Brand 3',
    serial: 'Serial 3',
  },
  {
    id: "7b5c0cb7-2494-4d5f-88fe-37b2b1364e64",
    model: 'Model 5',
    brand: 'Brand 5',
    serial: 'Serial 5',
  },
  {
    id: "1e6c58a3-c6ee-426d-8367-c9a8f66e6698",
    model: 'Model 6',
    brand: 'Brand 6',
    serial: 'Serial 6',
  },
  {
    id: "770b0543-2f42-4a00-8900-64f0321d9aae",
    model: 'Model 7',
    brand: 'Brand 7',
    serial: 'Serial 7',
  },
  {
    id: "6706e458-32bc-494b-8855-6296787389c5",
    model: 'Model 8',
    brand: 'Brand 8',
    serial: 'Serial 8',
  },
  {
    id: "ad9e9eaf-98d6-49ac-b635-8b0c79813f3c",
    model: 'Model 9',
    brand: 'Brand 9',
    serial: 'Serial 9',
  },
  {
    id: "cf39c14b-1d82-4395-bd23-ae8c3b994f7f",
    model: 'Model 10',
    brand: 'Brand 10',
    serial: 'Serial 10',
  },
  {
    id: "e38356ba-cd14-40a4-9f81-c067d9b0ebed",
    model: 'Model 11',
    brand: 'Brand 11',
    serial: 'serial 11',
  }]

const loans = [
  {
    staff_id: staff[0].id,
    asset_id: assets[0].id,
    status: 'checked out',
    date: '2022-12-06',
  },
  {
    staff_id: staff[1].id,
    asset_id: assets[1].id,
    status: 'checked in',
    date: '2022-11-14',
  },
  {
    staff_id: staff[4].id,
    asset_id: assets[4].id,
    status: 'checked out',
    date: '2022-10-29',
  },
  {
    staff_id: staff[3].id,
    asset_id: assets[3].id,
    status: 'checked in',
    date: '2023-09-10',
  },
  {
    staff_id: staff[5].id,
    asset_id: assets[5].id,
    status: 'checked out',
    date: '2023-08-05',
  },
  {
    staff_id: staff[2].id,
    asset_id: assets[2].id,
    status: 'checked in',
    date: '2023-07-16',
  },
  {
    staff_id: staff[0].id,
    asset_id: assets[0].id,
    status: 'checked out',
    date: '2023-06-27',
  },
  {
    staff_id: staff[3].id,
    asset_id: assets[3].id,
    status: 'checked in',
    date: '2023-06-09',
  },
  {
    staff_id: staff[4].id,
    asset_id: assets[4].id,
    status: 'checked out',
    date: '2023-06-17',
  },
  {
    staff_id: staff[5].id,
    asset_id: assets[5].id,
    status: 'checked in',
    date: '2023-06-07',
  },
  {
    staff_id: staff[1].id,
    asset_id: assets[1].id,
    status: 'checked out',
    date: '2023-08-19',
  },
  {
    staff_id: staff[5].id,
    asset_id: assets[5].id,
    status: 'checked in',
    date: '2023-06-03',
  },
  {
    staff_id: staff[2].id,
    asset_id: assets[2].id,
    status: 'checked out',
    date: '2022-06-05',
  },
];

export { staff, assets, loans };