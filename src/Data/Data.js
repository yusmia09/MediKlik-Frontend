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

//SidebarData
export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Dashboard",
    },
    
    {
        icon: UilClipboardAlt,
        heading: "Orders",
    },

    {
        icon: UilUsersAlt,
        heading: "Customers",
    },

    {
        icon: UilFolder,
        heading: "Category",
    },

    {
        icon: UilPackage,
        heading: "Products"
    },
    
    {
        icon: UilChart,
        heading: 'Analytics'
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
]