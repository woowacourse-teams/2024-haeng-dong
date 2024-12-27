import {http, HttpResponse, PathParams} from 'msw';

import {ADMIN_API_PREFIX, MEMBER_API_PREFIX} from '@apis/endpointPrefix';

import {billData, billDetailsData} from '@mocks/sharedState';

import {MOCK_API_PREFIX} from './../mockEndpointPrefix';

interface BillDetailsData {
  [key: string]: {billDetails: {id: number; memberName: string; price: string}[]};
}

export const billHandler = [
  // GET /api/eventId/bills
  http.get(`${MOCK_API_PREFIX}${MEMBER_API_PREFIX}/:eventId/bills`, () => {
    return HttpResponse.json(billData);
  }),

  // GET /api/eventId/bills/billId/fixed
  http.get(`${MOCK_API_PREFIX}${MEMBER_API_PREFIX}/:eventId/bills/:billId/fixed`, ({params}) => {
    const {billId} = params;
    const billDetails = (billDetailsData as unknown as BillDetailsData)[billId as keyof BillDetailsData];
    return HttpResponse.json(billDetails);
  }),

  // POST /api/eventId/bills
  http.post<PathParams, {title: string; price: number; members: number[]}>(
    `${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/bills`,
    async ({request}) => {
      try {
        const {title, price, members} = await request.json();
        const newBill = {id: Date.now(), title, price, isFixed: false};

        const lastStep = billData.steps[billData.steps.length - 1];
        const isSameMembers = JSON.stringify(lastStep.members.map(m => m.id).sort()) === JSON.stringify(members.sort());

        if (isSameMembers) {
          lastStep.bills.push(newBill);
        } else {
          billData.steps.push({
            bills: [newBill],
            members: members.map(id => ({id, name: `Member ${id}`})),
          });
        }

        (billDetailsData as unknown as BillDetailsData)[newBill.id.toString()] = {
          billDetails: members.map((id, index) => ({
            id,
            memberName:
              billData.steps.flatMap(step => step.members).find(member => member.id === id)?.name || `Member ${id}`,
            price: (Math.floor(price / members.length) + (index < price % members.length ? 1 : 0)).toString(),
          })),
        };

        return HttpResponse.json({status: 200});
      } catch (error) {
        return HttpResponse.json({message: 'Internal Server Error'}, {status: 500});
      }
    },
  ),

  // DELETE /api/eventId/bills/billId
  http.delete(`${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/bills/:billId`, ({params}) => {
    const {billId} = params;
    billData.steps.forEach(step => {
      step.bills = step.bills.filter(bill => bill.id !== Number(billId));
    });
    delete (billDetailsData as unknown as BillDetailsData)[billId as keyof BillDetailsData];
    return HttpResponse.json({status: 200});
  }),

  // PUT /api/eventId/bills/billId
  http.put<PathParams, {title: string; price: number}>(
    `${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/bills/:billId`,
    async ({params, request}) => {
      const {billId} = params;
      const {title, price} = await request.json();

      billData.steps.forEach(step => {
        const billIndex = step.bills.findIndex(bill => bill.id === Number(billId));
        if (billIndex !== -1) {
          step.bills[billIndex] = {...step.bills[billIndex], title, price};
        }
      });

      return HttpResponse.json({status: 200});
    },
  ),

  // PUT /api/eventId/bills/billId/fixed
  http.put<PathParams, {billDetails: {id: number; price: number; isFixed: boolean}[]}>(
    `${MOCK_API_PREFIX}${ADMIN_API_PREFIX}/:eventId/bills/:billId/fixed`,
    async ({params, request}) => {
      const {billId} = params;
      const {billDetails} = await request.json();

      (billDetailsData as unknown as BillDetailsData)[billId as keyof BillDetailsData] = {
        billDetails: billDetails.map(detail => ({
          id: detail.id,
          memberName: 'Unknown',
          price: detail.price.toString(),
        })),
      };

      billData.steps.forEach(step => {
        const billIndex = step.bills.findIndex(bill => bill.id === Number(billId));
        if (billIndex !== -1) {
          step.bills[billIndex].isFixed = true;
        }
      });

      return HttpResponse.json({status: 200});
    },
  ),
];
