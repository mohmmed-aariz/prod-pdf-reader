import "next-auth"

declare module 'next-auth' {
    interface User{
        id?: String;
        role?: Role;
    }
}


enum Role {
    ADMIN,
    AGENCY_USER,
    GUEST,
    USER
}
  
declare module "next-auth/jwt" {
interface JWT {
    id?: string
    role: Role
}
}
  