import prisma from "./db";


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredContent(
  query: string,
  currentPage: number,
){
  const offset = (currentPage -1) * ITEMS_PER_PAGE;

  try {
    const content = await prisma.pdfDocument.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        coverImageUrl: true,
        //  pdfAppUrl: true,
        totalPages: true,
        createdAt: true,
        updatedAt: true,
        hide: true,
        size: true,
        author: {
          select: {
            user: {
              select: {
                name: true
              }
            }
            
          },
        },
      },
      where: {
        OR: [
          {
            author: {
              user: {
                name: {
                  contains: query,
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            title: {
              contains: query,
              mode: "insensitive"
            }
          },
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: ITEMS_PER_PAGE,
      skip: offset
    });

    // console.log(content);

    return content;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');

  }
}


export async function fetchDocumentById(id:string) {
    try{
        const data = await prisma.pdfDocument.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                coverImageUrl: true,
                pdfAppUrl: true, 
                hide: true
            }
        })

        if(!data) {
            throw new Error("Document not found!");
        }

        return data;
    }
    catch (error){
        console.error("Database error: ", error);
        throw new Error("Failed to fetch document.");
    }
}


export async function fetchDocumentPages(query: string){
  try {
    const count = await prisma.pdfDocument.count({
      where: {
        OR: [
          { author: { user: { name: {contains: query,mode: 'insensitive' } } } },
          { title: { contains: query, mode: "insensitive" } },
        ]
      },
    })

    const totalPages = Math.ceil(count/ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}