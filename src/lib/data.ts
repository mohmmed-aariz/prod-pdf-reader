"use server"

import { equal } from "assert";
import prisma from "./db";
import { Role } from "@prisma/client";


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
        viewCount:{
          select: {
            viewCount: true
          }
        },
        _count: {
          select: {
            viewHistory: true
          }
        },
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





export async function fetchEditors(
  // query: string,
  // currentPage: number,
){
  // const offset = (currentPage -1) * ITEMS_PER_PAGE;

  try {
    const editorsData = await prisma.agency.findMany({
      select: {
        id: true,
        _count: {
          select: { pdfDocuments: true},
        },

        // pdfDocuments: true,
        user: {
          select: { name: true, username: true, role: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    if(!editorsData) {
      throw new Error("Document not found!");
    }


    console.log(editorsData);

    return editorsData;
  }
  catch(error){
    console.error("Database error: ", error);
    throw new Error("Failed to fetch editors.");
  }

  // try {
  //   const content = await prisma.pdfDocument.findMany({
  //     select: {
  //       id: true,
  //       title: true,
  //       description: true,
  //       coverImageUrl: true,
  //       //  pdfAppUrl: true,
  //       totalPages: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       hide: true,
  //       size: true,
  //       author: {
  //         select: {
  //           user: {
  //             select: {
  //               name: true
  //             }
  //           }
            
  //         },
  //       },
  //     },
  //     where: {
  //       OR: [
  //         {
  //           author: {
  //             user: {
  //               name: {
  //                 contains: query,
  //                 mode: 'insensitive'
  //               }
  //             }
  //           }
  //         },
  //         {
  //           title: {
  //             contains: query,
  //             mode: "insensitive"
  //           }
  //         },
  //       ]
  //     },
  //     orderBy: {
  //       createdAt: 'desc'
  //     },
  //     take: ITEMS_PER_PAGE,
  //     skip: offset
  //   });

  //   // console.log(content);

  //   return content;

  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch invoices.');

  // }
}



export async function fetchUserContent(
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
        pdfAppUrl: true,
        // totalPages: true,
        createdAt: true,
        // updatedAt: true,
        // hide: true,
        // size: true,
        // author: {
        //   select: {
        //     user: {
        //       select: {
        //         name: true
        //       }
        //     }
            
        //   },
        // },
      },
      where: {
        hide: false,
        OR: [
          // {
          //   author: {
          //     user: {
          //       name: {
          //         contains: query,
          //         mode: 'insensitive'
          //       }
          //     }
          //   }
          // },
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

export async function fetchUserContentUrl(
  id: string,
){

  try {
    const content = await prisma.pdfDocument.findFirst({
      select: {
        title: true,
        pdfAppUrl: true,
        pdfPagesUrl: true,
        totalPages: true,
      },
      where: {
        id: id
      }
    });

    // console.log(content);

    return content;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');

  }
}


export async function fetchLatestDocumentId(){

  try {
    const content = await prisma.pdfDocument.findFirst({
      select: {
        id: true,
        title: true,
        description: true,
        coverImageUrl: true,
        createdAt: true,
        
      },
      where: {
        hide: false,
        
      },
      orderBy: {
        createdAt: 'desc'
      },
    });

    // console.log(content);

    return content;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');

  }
}



// export async function recordView(userId: string, documentId: string) {
//   // Create view history
//   await prisma.viewHistory.create({
//     data: {
//       userId,
//       documentId,
//     },
//   });

//   // Increment view count
//   await prisma.documentViewCount.upsert({
//     where: { documentId },
//     update: { viewCount: { increment: 1 } },
//     create: {
//       documentId,
//       viewCount: 1,
//     },
//   });
// }

export async function recordView(userId: string, documentId: string) {
  try {
    // Attempt to create the view history entry
    console.log(userId, documentId )
    const res = await prisma.viewHistory.create({
      data: {
        userId,
        documentId,
      },
    });
    // console.log(res);
  } catch (error) {
    console.log("Error while recording view: it has already been recorded");
    // if (error.code === 'P2002') {
    //   // The entry already exists
    //   console.log('The view history entry already exists.');
    // } else {
    //   throw error;
    // }
  }

  // Increment view count regardless of whether the view history entry already exists
  await prisma.documentViewCount.upsert({
    where: { documentId },
    update: { viewCount: { increment: 1 } },
    create: {
      documentId,
      viewCount: 1,
    },
  });
}


export async function incrementViewCount(documentId: string) {
  // Increment view count
  await prisma.documentViewCount.upsert({
    where: { documentId },
    update: { viewCount: { increment: 1 } },
    create: {
      documentId,
      viewCount: 1,
    },
  });
}


export async function incrementDownloadCount(documentId: string){
  await prisma.documentDownloadCount.upsert({
    where: { documentId},
    update: { downloadCount: { increment: 1}},
    create: {
      documentId,
      downloadCount: 1
    }
  })
}












export async function fetchDashboardCardData(){
  try {
    const documentCountPromise = await prisma.pdfDocument.count({
      where: {
        hide: false
      }
    });
    const editorsCountPromise = await prisma.agency.count();
    const userCountPromise = await prisma.user.count({
      where: {
        role: 'USER'
      }
    })

    const data = await Promise.all([
      documentCountPromise,
      editorsCountPromise,
      userCountPromise,
    ])

    // console.log("fetchDashboardCardData: ",data);
    return data
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}




// export async function fetchLatestDashboardContent(query: string, currentPage: number){
export async function fetchLatestDashboardContent(){

  try {
    const content = await prisma.pdfDocument.findMany({
      select: {
        id: true,
        title: true,
        // description: true,
        coverImageUrl: true,
        //  pdfAppUrl: true,
        totalPages: true,
        createdAt: true,
        // updatedAt: true,
        // size: true,
        viewCount:{
          select: {
            viewCount: true
          }
        },
        _count: {
          select: {
            viewHistory: true
          }
        },
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
        hide: false        
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5,
    });

    // console.log(content);

    return content;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');

  }
}


const SUBSCRIBERS_PER_PAGE = 10;

export async function fetchSubscriberPages(query: string) {
  try {
    const count = await prisma.user.count({
      where: {
        OR: [
          // {
          //   role: {
          //     equals: query as any,
          //     mode: 'insensitive',
          //   },
          // },
          {
            viewHistory: {
              some: {
                pdfDocument: {
                  title: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
          {
            name: {
              contains: query,
              mode: 'insensitive',
            }
          }
        ],
      },
    });

    const totalPages = Math.ceil(count / SUBSCRIBERS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of subscribers.');
  }
}



export async function fetchFilteredSubscribers(
  query: string, 
  currentPage: number
) {
  const offset = (currentPage - 1) * SUBSCRIBERS_PER_PAGE;

  try {
    const subscribers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        // viewHistory: {
        //   select: {
        //     documentId: true,
        //     viewedAt: true,
        //     pdfDocument: {
        //       select: {
        //         title: true,
        //       },
        //     },
        //   },
        // },
        _count: {
          select: {
            viewHistory: true
          }
        }
      },
      where: {
        OR: [
          // {
          //   role: {
          //     equals: query as Role, // Adjusting the role to match the enum type
          //   },
          // },
          {
            viewHistory: {
              some: {
                pdfDocument: {
                  title: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
          {
            name: {
              contains: query,
              mode: 'insensitive',
            }
          }
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    console.log("server: ", subscribers);
    return subscribers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered subscribers.');
  }
}


// export async function fetchFilteredSubscribersDistinct(
//   query: string, 
//   currentPage: number
// ) {
//   const offset = (currentPage - 1) * SUBSCRIBERS_PER_PAGE;

//   try {
//     const subscribers = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         image: true,
//         role: true,
//         createdAt: true,
//         viewHistory: {
//           select: {
//             documentId: true,
//             viewedAt: true,
//             pdfDocument: {
//               select: {
//                 title: true,
//               },
//             },
//           },
//         },
//         _count: {
//           select: {
//             viewHistory: true
//           }
//         }
//       },
//       where: {
//         OR: [
//           // {
//           //   role: {
//           //     equals: query as any, // Adjusting the role to match the enum type
//           //   },
//           // },
//           {
//             viewHistory: {
//               some: {
//                 pdfDocument: {
//                   title: {
//                     contains: query,
//                     mode: 'insensitive',
//                   },
//                 },
//               },
//             },
//           },
//         ],
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//       take: ITEMS_PER_PAGE,
//       skip: offset,
//     });

//     return subscribers;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch filtered subscribers.');
//   }
// }
