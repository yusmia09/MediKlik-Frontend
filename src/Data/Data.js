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
            backGround: "linear-gradient(180deg, #3DA7D9 0%, #8DBC42 100%)",
            boxShadow: "0px 10px 20px 0px #c7e6d2",
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
            backGround: "linear-gradient(180deg, #8DBC42 0%, #4DD4B0 100%)",
            boxShadow: "0px 10px 20px 0px #b6f0d4",
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
            backGround: "linear-gradient(180deg, #A7E1FF 0%, #FFB6C1 100%)",
            boxShadow: "0px 10px 20px 0px #ffd6e0",
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