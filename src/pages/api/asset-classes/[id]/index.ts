import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { assetClassValidationSchema } from 'validationSchema/asset-classes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.asset_class
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAssetClassById();
    case 'PUT':
      return updateAssetClassById();
    case 'DELETE':
      return deleteAssetClassById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAssetClassById() {
    const data = await prisma.asset_class.findFirst(convertQueryToPrismaUtil(req.query, 'asset_class'));
    return res.status(200).json(data);
  }

  async function updateAssetClassById() {
    await assetClassValidationSchema.validate(req.body);
    const data = await prisma.asset_class.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAssetClassById() {
    const data = await prisma.asset_class.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
