import prisma from "../src/config/prisma";
async function main() {
    console.log("Seeding database...");
    const properties = [
        {
            title: "Modern Penthouse",
            description: "A luxurious penthouse with panoramic city views.",
            price: 1200000,
            location: "Downtown",
        },
        {
            title: "Cozy Cottage",
            description: "A charming cottage surrounded by nature.",
            price: 450000,
            location: "Green Valley",
        },
        {
            title: "Beachfront Villa",
            description: "A stunning villa with direct access to the beach.",
            price: 3500000,
            location: "Ocean Drive",
        },
        {
            title: "Suburban House",
            description: "A spacious family home in a quiet neighborhood.",
            price: 800000,
            location: "Willow Creek",
        },
        {
            title: "Industrial Loft",
            description: "A trendy loft with high ceilings and industrial features.",
            price: 950000,
            location: "Arts District",
        },
    ];
    await prisma.property.createMany({ data: properties });
    console.log("Seeding finished.");
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map