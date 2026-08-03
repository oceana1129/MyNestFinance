import {
  Home,
  Zap,
  Car,
  Lightbulb,
  ShoppingCart,
  Wifi,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";

const month = {
  id: "month-1",

  title: "July 2026",
  subtitle: "A peek at how things are going.",

  planned: 4000,
  actual: 3150,

  recentActivity: [
    {
      id: "activity-1",
      variant: "activity",
      icon: Lightbulb,
      header: "Electric Bill",
      text: "Utilities • Jul 28",
      subtitle: "-$148.12",
    },
    {
      id: "activity-2",
      variant: "activity",
      icon: Car,
      header: "Gas",
      text: "Transportation • Jul 27",
      subtitle: "-$42.18",
    },
  ],

  categories: [
    {
      id: "category-1",

      name: "Housing",
      icon: Home,

      planned: 1600,
      actual: 1500,

      percentage: 47,

      insights: [
        {
          id: 1,
          icon: TrendingUp,
          header: "Budget",
          text: "94%",
          subtitle: "of planned",
        },
        {
          id: 2,
          icon: DollarSign,
          header: "Difference",
          text: "$100",
          subtitle: "remaining",
        },
        {
          id: 3,
          icon: Clock,
          header: "Last Activity",
          text: "Jul 2",
          subtitle: "Rent",
        },
      ],

      items: [
        {
          id: "item-1",

          name: "Rent",
          icon: Home,

          planned: 1450,
          actual: 1450,

          description: "Monthly apartment rent.",

          reminder: {
            enabled: true,
            daysBefore: 5,
          },

          plan: {
            frequency: "Monthly",
            day: 1,
          },

          debt: null,

          activity: [
            {
              id: "activity-10",

              name: "July Rent",

              amount: 1450,

              date: "Jul 1",

              notes: "Paid by ACH.",
            },
          ],
        },

        {
          id: "item-2",

          name: "Renter's Insurance",

          icon: Home,

          planned: 50,
          actual: 50,

          description: "Insurance policy.",

          reminder: {
            enabled: false,
          },

          plan: {
            frequency: "Monthly",
            day: 15,
          },

          debt: null,

          activity: [
            {
              id: "activity-11",

              name: "Insurance",

              amount: 50,

              date: "Jul 15",

              notes: "",
            },
          ],
        },
      ],
    },

    {
      id: "category-2",

      name: "Utilities",

      icon: Zap,

      planned: 300,
      actual: 246,

      percentage: 8,

      insights: [
        {
          id: 1,
          icon: TrendingUp,
          header: "Budget",
          text: "82%",
          subtitle: "of planned",
        },
        {
          id: 2,
          icon: DollarSign,
          header: "Remaining",
          text: "$54",
          subtitle: "left",
        },
        {
          id: 3,
          icon: Clock,
          header: "Last Activity",
          text: "Jul 28",
          subtitle: "Electricity",
        },
      ],

      items: [
        {
          id: "item-3",

          name: "Electricity",

          icon: Lightbulb,

          planned: 180,
          actual: 148,

          description: "Monthly electric bill.",

          reminder: {
            enabled: true,
            daysBefore: 3,
          },

          plan: {
            frequency: "Monthly",
            day: 28,
          },

          debt: null,

          activity: [
            {
              id: "activity-20",

              name: "Electric Bill",

              amount: 148.12,

              date: "Jul 28",

              notes: "Higher AC usage.",
            },
          ],
        },

        {
          id: "item-4",

          name: "Internet",

          icon: Wifi,

          planned: 70,
          actual: 68,

          description: "Fiber internet.",

          reminder: {
            enabled: false,
          },

          plan: {
            frequency: "Monthly",
            day: 12,
          },

          debt: null,

          activity: [
            {
              id: "activity-21",

              name: "Internet",

              amount: 68,

              date: "Jul 12",

              notes: "",
            },
          ],
        },
      ],
    },

    {
      id: "category-3",

      name: "Transportation",

      icon: Car,

      planned: 500,
      actual: 420,

      percentage: 13,

      insights: [
        {
          id: 1,
          icon: TrendingUp,
          header: "Budget",
          text: "84%",
          subtitle: "of planned",
        },
      ],

      items: [
        {
          id: "item-5",

          name: "Gas",

          icon: ShoppingCart,

          planned: 200,
          actual: 142,

          description: "Fuel purchases.",

          reminder: {
            enabled: false,
          },

          plan: null,

          debt: null,

          activity: [
            {
              id: "activity-30",

              name: "Costco Fuel",

              amount: 42.18,

              date: "Jul 27",

              notes: "",
            },
            {
              id: "activity-31",

              name: "Shell",

              amount: 39.88,

              date: "Jul 19",

              notes: "",
            },
          ],
        },
      ],
    },
  ],
};

export default month;