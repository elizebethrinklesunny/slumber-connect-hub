import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  Settings,
  Image as ImageIcon,
  Tag,
  Layers,
  Package,
  Flame,
  Star,
  ShieldCheck,
  Images,
  LogOut,
  Users,
} from "lucide-react";
import { toast } from "sonner";

const overview = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/dashboard/enquiries", label: "Enquiries", icon: MessageSquare },
];

const content = [
  { to: "/admin/dashboard/banners", label: "Banners", icon: ImageIcon },
  { to: "/admin/dashboard/offers", label: "Offers", icon: Tag },
  { to: "/admin/dashboard/categories", label: "Categories", icon: Layers },
  { to: "/admin/dashboard/products", label: "Products", icon: Package },
  { to: "/admin/dashboard/deals", label: "Deals", icon: Flame },
  { to: "/admin/dashboard/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/dashboard/trust-badges", label: "Trust Badges", icon: ShieldCheck },
  { to: "/admin/dashboard/gallery", label: "Gallery", icon: Images },
];

const account = [
  { to: "/admin/dashboard/profile", label: "Profile", icon: User },
  { to: "/admin/dashboard/admins", label: "Admin Users", icon: Users },
  { to: "/admin/dashboard/settings", label: "Site Settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate({ to: "/admin" });
  };

  const renderGroup = (
    label: string,
    items: { to: string; label: string; icon: typeof LayoutDashboard }[],
  ) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                >
                  <Link to={item.to} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-4">
        {!collapsed ? (
          <div>
            <p className="font-display text-lg font-bold text-primary">Elora</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
            D
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {renderGroup("Overview", overview)}
        {renderGroup("Content", content)}
        {renderGroup("Account", account)}
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
