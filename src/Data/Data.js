//Sidebar
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilFolder, 
    UilChart,
    UilUsdSquare,
    UilMoneyWithdrawal,
    UilSignOutAlt,
    
} from "@iconscout/react-unicons"

import img1 from '../assets/img4.png';
import img2 from '../assets/img6.png';
import img3 from '../assets/img7.png';

//SidebarData
export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Dashboard",
        path: "/admin"
    },
    
    {
        icon: UilClipboardAlt,
        heading: "Orders",
         path: "/admin/order"
    },

    {
        icon: UilUsersAlt,
        heading: "Customers",
         path: "/admin/customer",
    },

    {
        icon: UilFolder,
        heading: "Category",
        path: "/admin/category"
    },

    {
        icon: UilPackage,
        heading: "Products",
        path: "/admin/product",
    },
    
];

export const CardsData = [
    {
        title: "Sales",
       color: {
        backGround: "linear-gradient(180deg, #C3A3FF 0%, #A78BFA 100%)",
        boxShadow:"0 12px 25px rgba(167, 139, 250, 0.4), 0 6px 10px rgba(195, 163, 255, 0.3)",
        border: "1px solid rgba(167, 139, 250, 0.5)"
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
            name: "Sales",
            data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    }, 

    {
        title: "Revenue",
       color: {
        backGround: "linear-gradient(180deg, #4DA7FF 0%, #7FE9F5 100%)",
        boxShadow:"0 12px 25px rgba(77, 167, 255, 0.45), 0 6px 10px rgba(127, 233, 245, 0.35)",
        border: "1px solid rgba(77, 167, 255, 0.5)",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
            name: "Revenue",
            data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },

    {
        title: "Expenses",
       color: {
        backGround: "linear-gradient(180deg, #FF8FA3 0%, #FFB6C1 100%)",
        boxShadow:"0 12px 25px rgba(255, 143, 163, 0.45), 0 6px 10px rgba(255, 182, 193, 0.3)",
        border: "1px solid rgba(255, 143, 163, 0.5)",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
            name: "Expenses",
            data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];

export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];