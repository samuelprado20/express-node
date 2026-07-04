const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

exports.getUserAppointments = async (userId) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: parseInt(userId)},
      include: { timeBlock: true }
    })

    return appointments
  } catch (error) {
    throw new Error ("Error getting appointments history OMG")
  }
}