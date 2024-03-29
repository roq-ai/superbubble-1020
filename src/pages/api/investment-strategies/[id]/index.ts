import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { investmentStrategyValidationSchema } from 'validationSchema/investment-strategies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.investment_strategy
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getInvestmentStrategyById();
    case 'PUT':
      return updateInvestmentStrategyById();
    case 'DELETE':
      return deleteInvestmentStrategyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInvestmentStrategyById() {
    const data = await prisma.investment_strategy.findFirst(convertQueryToPrismaUtil(req.query, 'investment_strategy'));
    return res.status(200).json(data);
  }

  async function updateInvestmentStrategyById() {
    await investmentStrategyValidationSchema.validate(req.body);
    const data = await prisma.investment_strategy.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteInvestmentStrategyById() {
    const data = await prisma.investment_strategy.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
