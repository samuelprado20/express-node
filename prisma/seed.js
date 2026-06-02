const { PrismaClient, Role } = require('../generated/prisma');
const prisma = new PrismaClient();

async function populateUserSchema() {
  const users = [
    { name: 'User 1', email: 'user1@example.com', password: 'password', role: USER },
    { name: 'User 2', email: 'user2@example.com', password: 'password', role: USER },
    { name: 'User 3', email: 'user3@example.com', password: 'password', role: USER }
  ];
  
  for (const user of users) {
    await prisma.user.create({
      data: user
    });
  }
  
  console.log('Dummy users created successfully');
}

async function clearUserSchema() {
  await prisma.user.deleteMany()
  console.log('User table has been cleared successfully')
}

async function main() {
  

}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());