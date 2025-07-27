import {authClient} from "@/lib/auth-client";
import { DropdownMenu, DropdownMenuTrigger,  DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";



export const DashboardUserButton = () => {
    const router = useRouter();
    const { data, isPending } = authClient.useSession();
    const isMobile = useIsMobile();

    const logout =  () => {
        authClient.signOut({
            fetchOptions:{
                onSuccess:() => {
                    router.push("/sign-in");
                }
            }
        });
    };

    if(isPending || !data?.user) {
        return null;
    }
    if(isMobile){
        return (
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between hover:bg-white/10 overflow-hidden">
                {data.user.image ? (
                <Avatar className="size-8">
                    <AvatarImage src={data.user.image} alt={data.user.name} />
                    <AvatarFallback>{data.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                ) : (
                    <GeneratedAvatar
                        seed={data.user.name}
                        variant="initials"
                        className="size-8"
                    />
                )}
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full ml-2">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full ml-2">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button variant="outline" onClick={() => {}}>
                            <CreditCardIcon className="size-4 texxt-black" />
                            Billing
                        </Button>
                        <Button variant="outline" onClick={logout}>
                            <LogOutIcon className="size-4 texxt-black" />
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between hover:bg-white/10 overflow-hidden">
            {data.user.image ? (
                <Avatar className="size-8">
                    <AvatarImage src={data.user.image} alt={data.user.name} />
                    <AvatarFallback>{data.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                ) : (
                    <GeneratedAvatar
                        seed={data.user.name}
                        variant="initials"
                        className="size-8"
                    />
                )}
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full ml-2">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full ml-2">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side ="right" className="w-72" >
                <DropdownMenuLabel>
                    <div className = "flex flex-col gap-1">
                        <span className="truncate font-medium">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                    Billing
                    <CreditCardIcon className="size-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer flex items-center justify-between">
        
                    Logout
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}